const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class OrderStatusRetriever {
    retrieveOrderStatus() {
        return new Promise(function (resolve, reject) {
            var user = "570FF481878B49158B137BD7";
            var password = '';
            var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');
            var url = "https://api.zinc.io/v1/orders?limit=10&retailer=amazon";             
    
            var xhr = new XMLHttpRequest();  
            xhr.open("GET", url, false );
            xhr.setRequestHeader('Authorization', 'Basic '+ base64encodedData);
            xhr.responseType = 'json';
            xhr.onload = () => {return resolve(JSON.parse(xhr.responseText))};
            xhr.error = () => {return reject()};
            xhr.send();       
        });
    }
}

module.exports = {OrderStatusRetriever};