var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var app = express();
var port = 3000;

// Make sure to include the JSX transpiler
require("node-jsx").install({extension: '.jsx'});

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/getboards', function (req, res) {
  fs.readFile(__dirname+'/data/boardData.json', 'utf8', function (err, data) {
    var obj = JSON.parse(data);
    var keys = _.keys(obj).slice(0,-1);
    res.send(keys)
  });
});

app.get('/board/:input', function (req, res) {
  fs.readFile(__dirname+'/data/boardData.json', 'utf8', function (err, data) {
    var obj = JSON.parse(data);
    console.log(obj[req.params.input]);
    res.json({board: obj[req.params.input]});
  });
});

app.post('/maker', function (req, res) {
  //var data = require(__dirname+'/data/boardData.js');
  var obj;
  fs.readFile(__dirname+'/data/boardData.json', 'utf8', function (err, data) {
    var obj = JSON.parse(data);
    obj.count = obj.count+1;
    obj[obj.count] = req.body;
    fs.writeFile(__dirname+'/data/boardData.json', JSON.stringify(obj, null, 4), function (err) {
      if (err) throw err;
      res.send({count: obj.count})
    });
  });

});

// Set up Routes for the application
require('./app/routes/core-routes')(app);
//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        "route": "Sorry this page does not exist!"
    });
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);