const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const PSUDO_NOTES = [
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
    const { id, title, content } = req.body;
    const createdNote = {
        id: uuid(),
        title,
        content
    };
    PSUDO_NOTES.push(createdNote);

    res.status(201).json({createdNote});
};

exports.getNoteById = getNoteById;
exports.createNote = createNote;