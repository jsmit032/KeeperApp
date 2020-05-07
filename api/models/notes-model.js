const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// to tie notes schema to a user
// add a user_id field to look as followed:
// { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
const notesSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Users' }
});

module.exports = mongoose.model('Note', notesSchema);