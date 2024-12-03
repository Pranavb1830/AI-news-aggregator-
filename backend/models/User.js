const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    preferences: [String], 
});

module.exports = mongoose.model('User', UserSchema);
