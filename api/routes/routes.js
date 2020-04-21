module.exports = app => {
    const notes = require("../controllers/notes-controller");

    var router = require("express").Router();

    // Create a new Note
    router.post("/", notes.createNote);

    // Get all Notes in Database
    router.get("/", notes.getNotes);

    // Get Note by ID
    router.get("/:nid", notes.getNoteById);

    app.use('/api/notes', router);
};