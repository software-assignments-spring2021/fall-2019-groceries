var mocha = require('mocha');
var Cart = require('../backend/models/cart.model.js');
const assert = require('assert');

describe('Cart (Mongo) Tests', function() {
    var cart;
    beforeEach(function() {
        cart = new Cart({
            username: "testusername",
            num_items: 3,
            alias_list: ['apple', 'penne', 'banana']
        });
    });
    it('should be invalid if username is blank', function() {
        assert.notEqual(cart.username, "");
    });

    it('num_items element must equal length of alias_list', function() {
        assert.equal(cart.num_items, cart.alias_list.length);
    });
});

