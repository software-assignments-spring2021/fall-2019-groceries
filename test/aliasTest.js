var expect = require('chai').expect;
var Alias = require('../models/cart.model.js');

describe('cart tests', function() {
    it('should be invalid if username is blank', function(done) {
        var a = new Alias();

        a.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    
    
});

