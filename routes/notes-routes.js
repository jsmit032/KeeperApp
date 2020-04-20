const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes-controller');

router.get('/', notesController.getNotes);
router.get('/:nid', notesController.getNoteById);
router.post('/', notesController.createNote);
router.patch('/:nid', notesController.updateNote);
router.delete('/:nid', notesController.deleteNote);

module.exports = router;