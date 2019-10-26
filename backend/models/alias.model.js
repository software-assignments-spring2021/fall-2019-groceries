const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aliasSchema = new Schema ({
    username: {type: String, required: true},
    alias: {type: String, required: true},
    link: {type: String, required: true}
}, {
    timestamps: true,
});

const Alias = mongoose.model('Alias', aliasSchema);

module.exports = Alias;