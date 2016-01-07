var eventModel = require('./eventModel.js');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {
  postEvent: function(req,res) {
    //checks if event already exists
    var token = req.headers["x-access-token"];
    console.log("ACCESS TOKEN", token);
   

    eventModel.findOne({ 
      'eventDate': req.body.dibEvent.eventDate,
      'roomName': req.body.dibEvent.roomName
    }).then(function(result) {
      if(result){
        res.json({ result: false });
      } else {
        var storeEvent = eventModel.create.bind(eventModel);
        storeEvent(req.body.dibEvent);
        res.json({ result: true });
      }
    });
  },

  getUser: function(req, res) {
    res.json(req.user);
  },

  getEvent: function(req,res) {
    var token = req.headers["x-access-token"];
    console.log("ACCESS TOKEN", token);
     console.log("REQ SESSION",req.session);
     console.log("REQ USER",req.user);

    eventModel.find({'eventDate' : { $gte : new Date()} })
      .sort({eventDate: 1})
      .then(function(booked) {
        return res.json(booked);
      });
  }
};
