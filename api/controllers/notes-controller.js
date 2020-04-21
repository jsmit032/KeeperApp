const Note = require("../models/notes-model");
const HttpError = require('../models/http-error');
// const db = require("../models");
// // const Note = db.notes;

//Create and Save a new Note
const createNote = async (req, res, next) => {
    const { title, content } = req.body;
    const newNote = new Note ({
        title,
        content
    });

    try {
        await newNote.save();
    } catch (err) {
        // const error = new HttpError(
        //     'Creating note failed, please try again.',
        //     500
        // );
        return next(err);
    } 

    res.status(201).json({newNote});

};

// // Retrieve all Notes from database
// exports.findAll = (req, res) => {

// };

// // Find a single Note with an id
// exports.findOne = (req, res) => {

// };

// // Update a Note by the id
// exports.update = (req, res) => {

// };

// // Delete a Note by the id
// exports.delete = (req, res) => {

// };

exports.createNote = createNote;