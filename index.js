// var server = require("./server");
// var router = require("./router");

// server.start(router.route);
var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require("body-parser");
var base64Img = require('base64-img');
var app = express();
var fs = require('fs');
var multer = require('multer'); //檔案上傳囉！！
var upload = multer({
    dest: 'uploads/'
});  //dest: 你的檔案儲存路徑，這裡是設定在根目錄底下的uploads資料夾


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
    
  
    app.get('/cool', function(request, response) {
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
app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt)/i, function (req, res) {
    // console.log('==>'+__dirname + req.params[0] + "." + req.params[1]);
    res.sendFile(__dirname + "/" + req.params[0] + "." + req.params[1], function (err) {
        if (err) res.sendStatus(404);
    });
});

app.post('/uploadfile', function (req, res) {
    // console.log('come to save');  
    
    
    var data_url = req.body.imgBase64;
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
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

    fs.writeFile(__dirname+'/uploads' + '/'+phone+'.jpg', buffer, function (err) {
        console.log('[S,M,L,XL,28,30,32,34] '+'\n'+'['+shirtS+','+shirtM+','+shirtL+','+shirtXL+','+paint28+','+paint30+','+paint32+','+paint34+']');
        res.send('success');
        console.log('Upload to => '+__dirname+'/uploads' + '/'+phone+'.jpg');
        console.log('done');
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

