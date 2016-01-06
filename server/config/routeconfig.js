var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var utility = require(__dirname + '/../utility/utility.js');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

  var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/failure');
  }

  var userRouter = express.Router();
  require(__dirname + '/../users/userRoutes.js')(userRouter);
  // app.use('/api/users', utility.decode);
  // This won't work at this point because there is no login;
  app.use('/api/users', userRouter);

  var eventRouter = express.Router();
  require(__dirname + '/../events/eventRoutes.js')(eventRouter);
  // app.use('/api/events', utility.decode);
  app.use('/api/events', ensureAuthenticated, eventRouter);
  
  /*************************************************************
  Google Auth
  **************************************************************/
  var callback = process.env.CALLBACK || "http://127.0.0.1:5000/auth/google/callback";

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callback
    },
    function(accessToken, refreshToken, profile, done) {

      //create a user in the db
      console.log("profile", profile);
      return done(null, "was successful");
    }
  ));

  app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email','https://www.googleapis.com/auth/calendar']})
  );

  app.get('/auth/google/callback', 
    passport.authenticate('google'),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get('/failure', function(req, res) {
    res.status('404');
    res.send("you don't have access to that resource. redirecting to sign in.");
  });

};
