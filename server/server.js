var express = require('express');
var mongoose = require('mongoose');
var app = express();

// initialize express
// Mongoose DB Connection
var uri  = (process.env.MONGOLAB_URI || 'mongodb://mkslegacy:ripmatchr@ds039165.mongolab.com:39165/mkslegacy');

mongoose.connect(uri);

var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once("open", function(callback) {
  console.log("We've opened a connection");
});

//http is for any network protocal

var server = require('http').createServer(app);

//checking to see if PORT# is defined otherwise use 3000

var port = process.env.PORT || 3000;

require('./config/routeconfig.js')(app, express);

  /*
  express.static is a function taking the path name as an argument
  takes care of entire client side
  */
  
app.use(express.static(__dirname +  "/../public"));

server.listen(port);
