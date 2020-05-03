//jshint esversion:6
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

//Configure mongoose's promise to global promise
const db = require("./api/models");

// Init app
const app = express();

// Config app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Config Mongoose
db.mongoose
    .connect(process.env.MONGODB_URI || db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Models & routes
require('./api/models/users-model');
require("./api/config/passport");
require("./api/routes/routes")(app);
require("./api/routes/users")(app);


//production mode
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => {    
        res.sendFile(path.join(__dirname = 'client/build/index.html'));  
    });
}

//build 
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

//start 
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {  
    console.log( `server listening on port: ${PORT}`);
});