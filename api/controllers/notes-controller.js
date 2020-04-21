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
        const error = new HttpError(
            'Creating note failed, please try again.',
            500
        );
        return next(error);
    } 

    res.status(201).json({ note: newNote.toObject( {getters: true} )});

};

// // Retrieve all Notes from database
const getNotes = async (req, res, next) => {
    let notes;
    try {
        notes = await Note.find(foundNotes => {return foundNotes});
    } catch (err) {
        const error = new HttpError(
            'Could not find notes',
            500
        );
        return next(error);
    } 

    if (!notes || notes.length === 0) {
        const error = new HttpError (
            'Note database empty, Could not find notes', 
            404
        );
        return next(error);
    }
    
    res.json({ notes });
}

// // Find a single Note with an id
const getNoteById = async (req, res, next) => {
    const noteId = req.params.nid;
    let note;
    try {
        note = await Note.findById(noteId);
    } catch (err) {
        const error = new HttpError(
            'Could not find a note.', 
            500
        );
        return next(error);
    }

    if (!note) {
        const error = new HttpError(
            'Could not find a note by the provided id.', 
            404
        );
        return next(error);
    }

    res.json({ note: note.toObject( {getters: true}) });
    
}

// // Update a Note by the id
// exports.update = (req, res) => {

// };

// // Delete a Note by the id
// exports.delete = (req, res) => {

// };

exports.createNote = createNote;
exports.getNotes = getNotes;
exports.getNoteById = getNoteById;