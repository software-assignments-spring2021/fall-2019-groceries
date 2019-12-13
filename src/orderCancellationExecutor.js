const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class OrderCancellationExecutor {
	static cancelOrder(requestId, orderIds) {
		var user = "570FF481878B49158B137BD7";
        var password = '';
        var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');
        var url = "https://api.zinc.io/v1/orders/" + requestId + "/cancel";      

        var xhr = new XMLHttpRequest();  
        xhr.open("POST", url, false);
        xhr.setRequestHeader('Authorization', 'Basic '+ base64encodedData);
        xhr.responseType = 'json';
        xhr.send(JSON.stringify({merchant_order_id: orderIds}));     
        return JSON.parse(xhr.responseText);
	}
}

module.exports = {OrderCancellationExecutor};