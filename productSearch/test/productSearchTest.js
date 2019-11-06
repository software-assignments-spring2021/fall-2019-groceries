const assert = require('chai').assert;


const search = require("../productSearch.js");

describe('Product search tests', function() {

   
    //supposed to be false, which makes the test return false, meaning we dont get results
    it('Checking if we get search results', function() {
        
        var result = search.searchItem("9846450787979899685906584");

        var count = Object.keys(result.responseText).length;
       
        assert.isFalse(result > 114);
       

    });
    

    //this returns true because there are search results
    it('Checking if we get search results', function() {
        
        var result = search.searchItem("Apple");

        var count = Object.keys(result.responseText).length;
      
        assert.isFalse(result > 114);
        

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
        
        var result = search.searchItem("08-47549867945867089").status;

        
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
