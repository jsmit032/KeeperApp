const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email: String,
    password: String,
    notes: String
});

// hash & salt users and save passwords into database
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', userSchema);