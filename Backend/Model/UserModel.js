const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    githubData: Object,
    friends: [String],
    location: String,
    blog: String,
    bio: String,
}, { versionKey: false });


const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
