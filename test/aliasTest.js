var mocha = require('mocha');
var Alias = require('../backend/models/alias.model.js');
const assert = require('assert');

describe('alias tests', function() {
    var alias;
    beforeEach(function() {
        alias = new Alias({
            username: "testusername",
            alias: "apple",
            link: "amazon.com"
        });
    });
    it('should be invalid if username is blank', function() {
        assert.notEqual(alias.username, "");
    });
    it('should be invalid if alias is blank', function() {
        assert.notEqual(alias.alias, "");
    });
    it('should be invalid if link is blank', function() {
        assert.notEqual(alias.link, "");
    });
});

