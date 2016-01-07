var eventController = require('./eventController.js');

module.exports = function(app) {
  app.get('/events', eventController.getEvent);
  app.post('/booked', eventController.postEvent);
  app.get('/user', eventController.getUser);
};
