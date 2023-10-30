const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'plus member', 'admin'], default: 'user' },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true }
});

const User = mongoose.model('user_management', userSchema);

module.exports = User;
