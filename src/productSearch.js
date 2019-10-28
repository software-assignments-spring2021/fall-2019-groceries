var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.Buffer = global.Buffer || require('buffer').Buffer;
var requestPromise = require('request-promise');


class Search 
{

    constructor() {  
        this.item = item;       
    }

    getSearchItem() {
        return this.item;
    }

    setSearchItem(item) {
        this.item = item;
    }


    searchItem(query){
        
        var user = "570FF481878B49158B137BD7";
        var password = '';
        var url = "https://api.zinc.io/v1/search?query="+query+"&page=1&retailer=amazon";
        var searchResults = "";
        var results ="";


        var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');

        requestPromise.get({
        uri: url,
        headers: {
            'Authorization': 'Basic ' + base64encodedData
        },
        json: true
        })
        .then(function ok(jsonData) {

            searchResults = jsonData;
            
            return searchResults;
            //console.log(searchResults);
            //createString(searchResults);
            setSearchItem(searchResults);
            //console.dir(jsonData);
        })
        .catch(function fail(error) {
        console.log("error retreiving results");
    });
    
    }



}
module.exports = {
    Search
};
