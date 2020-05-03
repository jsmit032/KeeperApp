const mongoose = require('mongoose');
const passport = require('passport');


const Users = mongoose.model('Users');

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
