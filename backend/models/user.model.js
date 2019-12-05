const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aliasSchema = new Schema ({
    name: {type: String, required: true},
    link: {type: String, required: true}
});

const cartItem = new Schema ({
    link: {type: String},
    quantity: {type: Number}
});

const cartAliasSchema = new Schema ({
    name: {type: String},
    items: {type: [cartItem]}
});

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
    aliases: {type: [aliasSchema]},
    cartAliases: {type: [cartAliasSchema]}

});

const User = mongoose.model('User', userSchema);

module.exports = User;