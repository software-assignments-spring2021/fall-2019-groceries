var mocha = require('mocha');
var User = require('../backend/models/user.model.js');
const assert = require('assert');

describe('User (Mongo) Tests', function() {
    var user;
    beforeEach(function() {
        user = new User({
            username: "testusername",
            password: "testpassword",
            address: "123 Main St. New York, NY, 10003",
            full_name: "FirstName LastName",
            phone_number: 123456789

        });
    });
    it('should be invalid if username is blank', function() {
        assert.notEqual(user.username, "");
    });
    it('should be invalid if password is blank', function() {
        assert.notEqual(user.password, "");
    });
    it('should be invalid if full_name is blank', function() {
        assert.notEqual(user.full_name, "");
    });
    it('should be invalid if address is blank', function() {
        assert.notEqual(user.address, "");
    });
    it('should be invalid if phone_number is blank', function() {
        assert.notEqual(user.phone_number, "");
    });
    it('username must be longer than 3 characters', function() {
        assert.ok(user.username.length > 3);
    });
    
});

