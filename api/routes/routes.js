module.exports = app => {
    const notes = require("../controllers/notes-controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", notes.createNote);

    app.use('/api/notes', router);
};