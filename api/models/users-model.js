const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email: String,
    password: String,
    notes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Note' }]
});

// hash & salt users and save passwords into database
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', userSchema);