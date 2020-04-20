const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes-controller');

router.get('/:nid', notesController.getNoteById);
router.post('/', notesController.createNote);

module.exports = router;