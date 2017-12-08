

// var server = require("./server");
// var router = require("./router");

// server.start(router.route);
var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require("body-parser");
var base64Img = require('base64-img');
var app = express();
var fs = require('fs');
var tdb = require('tingodb')();
var db = require('node-localdb');
var orderAllDb = db('data/order.json');
var updateJson = require('update-json');

var multer = require('multer'); //檔案上傳囉！！
var upload = multer({
    dest: 'uploads/'
});  //dest: 你的檔案儲存路徑，這裡是設定在根目錄底下的uploads資料夾

// assert = require('assert');

// var db = new Engine.Db('/data', {});
// var collection = db.collection("orderAll");


// Connect to MongoDB
// var mongo = require('mongodb');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://eugenecheng:eu427724@ds129146.mlab.com:29146/dlivejerseys');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("Database Connected.");
// });






app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/uploads/'));
// app.use(express.static(__dirname + '/public/'));


app.get('/cool', function (request, response) {
    response.send(cool());
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) res.sendStatus(404);
    });

});
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.get('/twocolumn1.html', function (req, res) {
    res.sendFile(__dirname + '/twocolumn1.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.get('/twocolumn2.html', function (req, res) {
    res.sendFile(__dirname + '/twocolumn2.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.get('/onecolumn.html', function (req, res) {
    res.sendFile(__dirname + '/onecolumn.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.get('/demo.html', function (req, res) {
    res.sendFile(__dirname + '/demo.html', function (err) {
        if (err) res.sendStatus(404);
    });
});

app.get('/orderpage', function (req, res) {
    // console.log('orderpage');


    res.sendFile(__dirname + '/orderpage.html', function (err) {
        if (err) res.sendStatus(404);
    });
});

app.post('/orderpage', function (req, res, next) {
    // console.log('orderpage');
    var dataPath = __dirname + '/data/order.json';
    var ordersData = "";
    fs.readFile(dataPath, function (err, content) {
        var ordersData = content;
        // var ordersData = JSON.stringify(content);
        console.log('readOrders '+ordersData);
    });
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Length": ordersData.length
    });
    res.write(ordersData);
    console.log('returndata ');
    // return res.end(ordersData);
    res.end();


    // res.sendFile(__dirname + '/orderpage.html', function (err) {
    //     if (err) res.sendStatus(404);
    // });
});
app.get('/showorder', function (req, res) {
    // console.log('orderpage');


    res.sendFile(__dirname + '/showorder.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.post('/showorder', function (req, res, next) {
    
     var dataPath = __dirname + '/data/order.json';
     var ordersData = "";
     fs.readFile(dataPath, function (err, content) {

        //  console.log('content ='+content);
        //  console.log('content.length ='+content.length);
        //  var ordersData = content;
         var ordersData = content;

                     res.writeHead(200, {
             "Content-Type": "application/json",
             "Content-Length": ordersData.length
         });            
        //  console.log('returndata ');            
         res.end(ordersData);
     });
     
 });

app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg)/i, function (req, res) {
    // console.log('==>'+__dirname + req.params[0] + "." + req.params[1]);
    res.sendFile(__dirname + "/" + req.params[0] + "." + req.params[1], function (err) {
        // console.log('err='+err);
        // if (err) res.sendStatus(404);
        if (err) res.status(err.staus).end();
    });
});



app.post('/uploadfile', function (req, res) {
    // console.log('come to save');  


    var data_url = req.body.imgBase64;
    var username = req.body.orderName;
    var email = req.body.email;
    var phone = req.body.userphone;
    var shirtS = req.body.shirtS;
    var shirtM = req.body.shirtM;
    var shirtL = req.body.shirtL;
    var shirtXL = req.body.shirtXL;
    var paint28 = req.body.paint28;
    var paint30 = req.body.paint30;
    var paint32 = req.body.paint32;
    var paint34 = req.body.paint34;

    // console.log('data='+data_url);
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');
    //包裝資料存資料庫
    var orderNumber = phone;
    var orderName = username;
    var orderEmail = email;
    var userphone = phone;
    // var imageFile = __dirname + '\\uploads' + '\\' + phone + '.jpg';
    var imageFile = '\\uploads' + '\\' + phone + '.jpg';
    var orderobj = {};
    var orderDetail = [];
    var onumber = orderNumber;
    var detail = {
        // playerName,
        // playerNumber,
        // shirtSize,
        // paintSize
    };

    // var cart ={};
    orderobj = {
        orderNumber: req.body.orderNumber,
        orderName: req.body.orderName,
        orderEmail: req.body.orderEmail,
        userphone: phone,
        imageFile: imageFile,
        orderDetail: req.body.orderDetail
    }
    // var oobj = orderobj;
    // console.log('orderNumber ='+orderNumber);
    // console.log('orderName ='+orderName);
    // console.log('orderEmail ='+orderEmail);
    // console.log('userphone ='+userphone);    
    // console.log('imageFile ='+imageFile);    
    // console.log('orderobj ='+orderobj);




    var dataEmpty = false;
    var dataPath = __dirname + '/data/order.json';


    fs.writeFile('\\uploads' + '\\' + phone + '.jpg', buffer, function (err) {
        // console.log('[S,M,L,XL,28,30,32,34] ' + '\n' + '[' + shirtS + ',' + shirtM + ',' + shirtL + ',' + shirtXL + ',' + paint28 + ',' + paint30 + ',' + paint32 + ',' + paint34 + ']');
        // res.send('success');
        //資料存資料庫
        // console.log('readjsonouttttttt' );
        fs.readFile(dataPath, function (err, content) {
            // console.log('readjsoninnnnnnnn' );
            if (err) throw err;
            var parseJson = JSON.parse(content);
            // console.log('orderNumber =' +orderNumber);
            // console.log('parseJson =' +parseJson);
            // console.log('parseJson.length =' +parseJson.length);
            // console.log('parseJson[0].oobj.orderName =' +parseJson[0].oobj.imageFile);

            if (parseJson.length > 0) {
                for (i = 0; i <= parseJson.length; i++) {
                    // console.log('parseJson['+i+']' );
                    // console.log('parseJson.length ['+parseJson.length +']' );
                    if (i === parseJson.length) {
                        // console.log('break' );
                        // console.log('parseJson['+i+']' );
                        parseJson.push({ onumber: orderNumber, oobj: orderobj });
                        break;
                    }
                    // if(i === parseJson.length){
                    //     console.log('i == parseJson.length parseJson['+i+']' ); 
                    //     parseJson.push({onumber:orderNumber, oobj: orderobj});
                    //     // continue;
                    // }else 
                    if (parseJson[i].onumber == orderNumber) {

                        var orders = parseJson;
                        var j = orders.length;
                        var matchdata = orderNumber;
                        while (j--) {
                            if (matchdata.indexOf(orders[j].onumber) != -1) {
                                orders.splice(j, 1);
                            }
                        }
                        //  console.log('Json =' +orderNumber);
                        parseJson.push({ onumber: orderNumber, oobj: orderobj });
                        // console.log('parseJson[' + i + '] =' + parseJson[i].onumber);
                        // console.log('Json =' +orderNumber);
                        // parseJson[i].oobj = orderobj;
                        // parseJson[i].onumber = orderNumber;
                        // parseJson[i].oobj = orderobj;
                        // var inputdata ={onumber:orderNumber,oobj:orderobj};
                        // inputdata = {onumber:orderNumber, oobj: orderobj};
                        // console.log('parseJson.oobj.orderName[' + i + '] =' + parseJson[i].oobj.orderName);
                        // parseJson.updateJson({onumber: parseJson[i].onumber, oobj: parseJson[i].oobj});
                        // parseJson.push({ onumber: parseJson[i].onumber, oobj: parseJson[i].oobj });
                        // updateJson(dataPath, parseJson[i], function (error) {
                        //     // console.log('parseJson.oobj.orderName[' + i + '] =' + parseJson[i].oobj.orderName);
                        //     if (error) {
                        //         throw error;
                        //     }
                        // });
                        break;

                    }
                }
            } else {
                parseJson.push({ onumber: orderNumber, oobj: orderobj });
                // dataEmpty =true;
            }


            // console.log('parseJson.onumber =' +parseJson.onumber);




            // parseJson.push({onumber:orderNumber, oobj: orderobj});


            fs.writeFile(__dirname + '/data/order.json', JSON.stringify(parseJson), function (err) {
                if (err) throw err;
            });

        });


        // orderAllDb.findOne({ onumber: orderNumber }).then(function (u) {
        //     console.log('findOne='+u); // undefined, because we don't have a user with username 'xx'           
        //     if(u==undefined||u==null||u==""){
        //         console.log('dataEmpty='+dataEmpty);
        //         dataEmpty = true;
        //     }            
        // });
        // if (dataEmpty) {
        //     console.log('insert=');
        //     orderAllDb.insert({ onumber: orderNumber, oobj: orderobj }).then(function (u) {
        //         console.log(u); // print user, with a auto generate uuid
        //     });
        // }else{
        // console.log('update=');
        // orderAllDb.update({ onumber: orderNumber, oobj: orderobj }).then(function (u) {
        //     console.log(u); // print user, with a auto generate uuid
        // });
        // }





        // collection.insert({
        //     "orderNumber": orderNumber,
        //     "objorder": objorder
        // });

        console.log('Upload to => ' + __dirname + '/uploads' + '/' + phone + '.jpg');
        console.log('done');

        // orderAllDb.find({}).then(function(us){
        //     console.log(us.length); 
        //     console.log(us); // an array with one object
        // });

    });

    // console.log('data=' + data_url);
    // var buffer = new Buffer(data_url, "base64");
    // console.log('data2=' + buffer);          

    // fs.writeFile("arghhhh.jpg", new Buffer(data_url, "base64"), function (err) {
    //     res.send('success');
    //     console.log('done');
    // });

});

port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});

