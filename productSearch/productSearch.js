var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    
global.Buffer = global.Buffer || require('buffer').Buffer;
    
//var requestPromise = require('request-promise');
/*
class Search {
   
    constructor() {  
              
    	this.search = search;     
    }

    getSearch() {
        return this.search;
    }

    setSearch(search) {
        this.search = search;
    }

*/
    module.exports = {
        
        searchItem: function(query){
    

        var user = "570FF481878B49158B137BD7";
        var password = '';
        var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');


        var url = "https://api.zinc.io/v1/search?query="+query+"&page=1&retailer=amazon";
                
        //var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');
        xmlHttp = new XMLHttpRequest();  
        xmlHttp.open( "GET", url, false );
        xmlHttp.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        xmlHttp.responseType = 'json';
        xmlHttp.send();

        var count = Object.keys(xmlHttp.responseText).length;

        //console.log(xmlHttp.responseText);
        //console.log(count);

        //this.search = xmlHttp.responseText;
        //return count;
        return xmlHttp;

    }

    

    }


    
//}

//module.exports = {
    //Search
//}


/*
function searchItem(query)
{
        let data = {};
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

            //searchResults = jsonData;
            //console.log(searchResults);

            data = JSON.parse(jsonData);
            //return searchResults;
            //console.log(searchResults);
            //createString(searchResults);
            //setSearchItem(searchResults);
           
        })
        .catch(function fail(error) {
        console.log("error retreiving results");
    });

    return data;
}
*/

