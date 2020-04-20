const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let PSUDO_NOTES = [
    {
      id: '1',
      title: "Delegation",
      content:
        "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem"
    },
    {
      id: '2',
      title: "Loops",
      content:
        "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat."
    },
    {
      id: '3',
      title: "Arrays",
      content:
        "Q. Why did the programmer quit his job? A. Because he didn't get arrays."
    },
    {
      id: '4',
      title: "Hardware vs. Software",
      content:
        "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software."
    }
  ];

const getNotes = (req, res, next) => {
    const notes = PSUDO_NOTES.filter(foundNotes => {
        return foundNotes;
    });

    if (!notes || notes.length === 0) {
        throw new HttpError ('Could not find notes', 404);
    } 

    res.json({ notes });
}

const getNoteById = (req, res, next) => {
    const noteId = req.params.nid;
    const note = PSUDO_NOTES.find(n => {
        return n.id === noteId;
    });

    if (!note) {
        throw new HttpError('Could not find a note for provided id.', 404);
    }

    res.json({note});
}

const createNote = (req, res, next) => {
    const { title, content } = req.body;
    const createdNote = {
        id: uuidv4(),
        title,
        content
    };
    PSUDO_NOTES.push(createdNote);

    res.status(201).json({createdNote});
};

const updateNote = (req, res, next) => {
    const noteId = req.params.nid;
    const { title, content } = req.body;

    const updatedNote = {...PSUDO_NOTES.find(n => n.id === noteId)};
    const noteIndex = PSUDO_NOTES.findIndex(n => n.id === noteId);
    updatedNote.title = title;
    updatedNote.content = content;

    PSUDO_NOTES[noteIndex] = updatedNote;

    res.status(200).json({updatedNote});
}

const deleteNote = (req, res, next) => {
    const noteId = req.params.nid;
    PSUDO_NOTES = PSUDO_NOTES.filter(n => n.id !== noteId);
    res.status(200).json({message: 'Deleted note!'});
}

exports.getNotes = getNotes;
exports.getNoteById = getNoteById;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;