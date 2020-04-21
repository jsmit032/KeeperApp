//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const db = require("./api/models");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // required to submit to api
app.use(express.static('public'));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to the Keeper App."});
});

require("./api/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}.`);
  });