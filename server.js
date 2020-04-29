//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const db = require("./api/models");
const path = require('path');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Static file 
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(express.static('public'));

db.mongoose
    .connect(process.env.MONGODB_URI || db.url, {
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

//production mode
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'client/build/index.html'));  
    });
}

//build 
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

//start 
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {  
    console.log( `server listening on port: ${PORT}`);
});