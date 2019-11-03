const mongoose = require('mongoose');


var Schema = mongoose.Schema;

var cartSchema = new Schema ({
    username: {type: String, required: true},
    item_list: {type: [itemSchema], required: true}
});

var itemSchema = new Schema ({
    quantity: {type: Number, required: true},
    item: {type: String, required: true}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;