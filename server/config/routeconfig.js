var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var utility = require(__dirname + '/../utility/utility.js');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(morgan('combined'));
    //passport
  app.use(session({secret: 'SECRET'}))
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  var userRouter = express.Router();
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  // app.use('/api/users', utility.decode);
  // This won't work at this point because there is no login;
  app.use('/api/users', userRouter);

  var eventRouter = express.Router();
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
  // app.use('/api/events', utility.decode);
  app.use('/api/events', eventRouter);
  
  /*************************************************************
  Google Auth
  **************************************************************/

  app.get('/auth/google', function(request, response) {
    response.send('google authentication route');
  });
};
