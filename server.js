//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
//const ejs = require('ejs');
const mongoose = require('mongoose');

const notesRoutes = require('./routes/notes-routes');
const HttpError = require('./models/http-error');

//// Set Up Express App
const app = express();

// app.use(express.static("public"));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

////Routes

app.use('/api/notes', notesRoutes);
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
app.use((err, req, res, next)=>{
    if (res.headerSent) {
        return next(err);

    }
    res.status(err.code || 500);
    res.json({message: err.message || "An unknown error occured!"});
});

//// Configure Mongo
// mongoose.connect('mongodb://localhost:27017/noteDB', {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true);

// const noteSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });

// const Note = new mongoose.model('Note', noteSchema);

app.listen(3000, function(){
    console.log("Server started on port 3000");
});