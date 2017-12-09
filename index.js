

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













app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/uploads/'));


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
    res.sendFile(__dirname + '/orderpage.html', function (err) {
        if (err) res.sendStatus(404);
    });
});

app.post('/orderpage', function (req, res, next) {  
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

    res.sendFile(__dirname + '/showorder.html', function (err) {
        if (err) res.sendStatus(404);
    });
});
app.post('/showorder', function (req, res, next) {
    
     var dataPath = __dirname + '/data/order.json';
     var ordersData = "";
     fs.readFile(dataPath, function (err, content) {

         var ordersData = content;

                     res.writeHead(200, {
             "Content-Type": "application/json",
             "Content-Length": ordersData.length
         });                       
         res.end(ordersData);
     });
     
 });

app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg)/i, function (req, res) {
    res.sendFile(__dirname + "/" + req.params[0] + "." + req.params[1], function (err) {
        // console.log('err='+err);
        if (err) res.sendStatus(404);
        // if (err) res.status(err.staus).end();
    });
});



app.post('/uploadfile', function (req, res) {


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
    var imageFile = './uploads' + '/' + phone + '.jpg';
    var orderobj = {};
    var orderDetail = [];
    var onumber = orderNumber;
  

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
    // var dataPath = __dirname + '/data/order.json';
    var dataPath =  './data/order.json';


    fs.writeFile('./uploads' + '/' + phone + '.jpg', buffer, function (err) {
        
        //資料存資料庫
        fs.readFile(dataPath, function (err, content) {
            if (err) throw err;
            var parseJson = JSON.parse(content);

            if (parseJson.length > 0) {
                for (i = 0; i <= parseJson.length; i++) {
                    if (i === parseJson.length) {
                        parseJson.push({ onumber: orderNumber, oobj: orderobj });
                        break;
                    }
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
                        break;

                    }
                }
            } else {
                parseJson.push({ onumber: orderNumber, oobj: orderobj });
            }


            fs.writeFile( './data/order.json', JSON.stringify(parseJson), function (err) {
                if (err) throw err;
            });

        });


       

        console.log('Upload to => ' + __dirname + '/uploads' + '/' + phone + '.jpg');
        console.log('done');


    });

});

port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});

