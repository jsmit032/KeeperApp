const Note = require("../models/notes-model");
const HttpError = require('../models/http-error');

// //Create and Save a new Note
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
const updateNote = async (req, res, next) => {
    const noteId = req.params.nid;
    const { title, content } = req.body;

    let note;
    try {
        note = await Note.findById(noteId);
    } catch (err) {
        const error = new HttpError(
            'Could not update note',
            500
        );
        return next(error);
    }
    note.title = title;
    note.content = content;

    try {
        await note.save();
    } catch (err) {
        const error = new HttpError(
            'Could not save note to database',
            500
        );
        return next(error);
    }

    res.status(200).json({note: note.toObject({ getters: true }) });
}

// // Delete a Note by the id
const deleteNote = async (req, res, next) => {
    const noteId = req.params.nid;
    let note;
    try {
        note = await Note.findByIdAndRemove(noteId);
    } catch (err) {
        const error = new HttpError(
            'Could not delete note from database',
            500
        );
        return next(error);
    }
    res.status(200).json({message: 'Deleted note!'});
}

exports.createNote = createNote;
exports.getNotes = getNotes;
exports.getNoteById = getNoteById;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;