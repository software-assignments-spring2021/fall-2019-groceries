const assert = require('chai').assert;
const {Search} = require("../src/productSearch.js");

describe('product search tests', function() {

    var search;

    beforeEach(function() {
        search = new Search();
   });

    
    it('returning the search results', function() {
        
        search.searchItem("apple");
        assert.equal(search.getSearchItem(), 0);

	});


});