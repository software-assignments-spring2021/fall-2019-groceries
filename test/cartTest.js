var mocha = require('mocha');
var Cart = require('../backend/models/cart.model.js');
const assert = require('assert');

describe('Cart (Mongo) Tests', function() {
    var cart;
    beforeEach(function() {
        cart = new Cart({
            username: "testusername",
            items: [
                {
                    name: "banana",
                    quantity: 5
                }
            ],
            fullItemsInfo: [
                {
                    cost: 4.00,
                    id: "testid",
                    link: "amazon.com/banana",
                    name: "banana"
                }
            ]
            
        });
    });
    it('should be invalid if username is blank', function() {
        assert.notEqual(cart.username, "");
    });
    
    it('should be invalid if items.length and fullItemsInfo.length are not equal', function() {
        assert.equal(cart.items.length, cart.fullItemsInfo.length);
    });
});

