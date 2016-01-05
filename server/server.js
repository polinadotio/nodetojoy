var express = require('express');
var mongoose = require('mongoose');
var app = express();

var uri  = (process.env.MONGOLAB_URI || 'mongodb://localhost/test');

mongoose.connect(uri);

var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once("open", function(callback) {
  console.log("We've opened a connection");
});

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

require('./config/routeconfig.js')(app, express);

/*
express.static is a function taking the path name as an argument
takes care of entire client side
*/

app.use(express.static(__dirname +  "/../public"));


server.listen(port);
