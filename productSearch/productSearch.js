var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.Buffer = global.Buffer || require('buffer').Buffer;

module.exports = {
    searchItem: function(query) {
        var user = "570FF481878B49158B137BD7";
        var password = '';
        var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');
        var url = "https://api.zinc.io/v1/search?query="+query+"&page=1&retailer=amazon";             
        xmlHttp = new XMLHttpRequest();  
        xmlHttp.open("GET", url, false );
        xmlHttp.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        xmlHttp.responseType = 'json';
        xmlHttp.send();       
        return xmlHttp;
    }
}