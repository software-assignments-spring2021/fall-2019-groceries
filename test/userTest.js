var expect = require('chai').expect;
var User = require('../models/user.model.js');

describe('user tests', function() {
    it('should be invalid if blank', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    
    
});

