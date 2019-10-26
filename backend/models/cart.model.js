const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    username: {type: String, required: true},
    num_items: {type: Number, required: true},
    alias_list: {type: [String], required: true}
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;