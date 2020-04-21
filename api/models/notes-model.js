// const mongoose = require("mongoose");

// const noteSchema = mongoose.Schema(
//     {
//         title: {type: String, required: true},
//         content: {type: String, required: true}
//     }
// )

// noteSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

// module.export = new mongoose.model('Note', noteSchema);


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// to tie notes schema to a user
// add a user_id field to look as followed:
// { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
const notesSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true}
});

module.exports = mongoose.model('Note', notesSchema);