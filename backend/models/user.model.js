const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {type: String, required: true},
    full_name: {type: String, required: true},
    address: {type: String, required: true},
    phone_number: {type: Number, required: true},


}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;