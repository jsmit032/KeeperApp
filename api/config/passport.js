const mongoose = require('mongoose');
const passport = require('passport');


//const Users = mongoose.model('Users');
const Users = require('../models/users-model');

passport.use(Users.createStrategy());
// passport.serializeUser(Users.serializeUser());
// passport.deserializeUser(Users.deserializeUser());

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log("Serialized User?: " + user);
    console.log(user.id);
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
