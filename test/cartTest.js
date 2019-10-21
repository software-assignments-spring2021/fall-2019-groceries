var expect = require('chai').expect;
var Cart = require('../models/cart.model.js');

describe('cart tests', function() {
    it('should be invalid if username is blank', function(done) {
        var c = new Cart();

        c.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    
    
});

