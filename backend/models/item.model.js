const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    
    cost: {type: Number, required: true},
    id: {type: String, required: true},
    link: {type: String, required: true},
    name: {type: String, required: true}
    
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;