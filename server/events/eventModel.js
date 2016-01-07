var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  eventDate: Date,
  eventEndDate: Date,
  eventDescription: String,
  eventAlert: Boolean,
  roomName: String,
  houseName: String,
  user: String
});

module.exports = mongoose.model('Event', eventSchema);
