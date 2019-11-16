const assert = require('chai').assert;


const search = require("../productSearch.js");

describe('Product search tests', function() {
    this.timeout(10000);
   
    //supposed to be false, which makes the test return false, meaning we dont get results
    it('Checking if we get search results', function() {
        
        var result = search.searchItem("banana");

        var resultJSON = JSON.parse(result.responseText);
        
        
        assert.isNotEmpty(resultJSON.results)
        

    });
    

    //this returns true because there are search results
    it('Checking if we get search results', function() {
        
        var result = search.searchItem("garmin");

        var resultJSON = JSON.parse(result.responseText);
        
        
        assert.isNotEmpty(resultJSON.results)
        

    });
    
    //this returns true if we do not get an error searching the results
    it('Checks if we have an error', function() {
        
        var result = search.searchItem("Apple").responseText;

       
        assert.isFalse(result == "error");
        

	});


    //this returns true if the server, amazon, is up and running
    it('Checks server, amazon, is up and running', function() {
        
        var result = search.searchItem("Apple+watch").status;

        
        assert.isTrue(result == 200);
        //assert.equal(obj, "error");

	});


    //this returns true if the server, amazon, is up and running
    it('Checks server, amazon, is up and running', function() {
        
        var result = search.searchItem("racecar").status;

        
        assert.isTrue(result == 200);
       
        
    });
    

    //this checks if what we are getting back is an object, a JSON object
    it('Checks if format we get is a json object', function() {
        
        var result = search.searchItem("banana");

        
        assert.isObject(result);
      
    });

    //checks the same as before, but sometimes it times out
    it('Checks again to see how the request speed is', function() {
        
        var result = search.searchItem("macbook+pro");

        
        assert.isObject(result);
      
    });
    





});
