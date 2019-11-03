const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const cartSchema = new Schema ({
    username: {type: String, required: true},
    items: {type: [cartItemSchema]},
    fullItemsInfo: {type: [fullItemSchema]}
});

var cartItemSchema = new Schema ({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},

});

var fullItemSchema = new Schema ({
    cost: {type: Number},
    id: {type: String},
    link: {type: String},
    name: {type: String}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;