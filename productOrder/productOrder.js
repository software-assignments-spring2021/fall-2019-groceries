var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    
global.Buffer = global.Buffer || require('buffer').Buffer;

var user = "570FF481878B49158B137BD7";
var password = '';
var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');

order();

    function order(){

        var url = "https://api.zinc.io/v1/orders";
          
  
        var jsonOrder = '{ "retailer": "amazon", "products": ['+
        '{ "product_id": "B0016NHH56", "quantity": 1 }'+
        ' ], "max_price": 1, "shipping_address": { "first_name": "Tim", "last_name": "Beaver",'+
        '"address_line1": "77 Massachusetts Avenue", "address_line2": "","zip_code": "02139", "city": "Cambridge",'+
        '"state": "MA", "country": "US", "phone_number": "5551230101" }, "payment_method": { "name_on_card": "Ben Bitdiddle",'+
        '"number": "5555555555554444", "security_code": "123", "expiration_month": 1, "expiration_year": 2020, "use_gift": false},'+
        '"retailer_credentials": { "email": "timbeaver@gmail.com", "password": "myRetailerPassword" },'+
        '"billing_address": { "first_name": "William", "last_name": "Rogers", "address_line1": "84 Massachusetts Ave","address_line2": "",'+
        '"zip_code": "02139","city": "Cambridge","state": "MA","country": "US","phone_number": "5551234567"},'+
        '"is_gift": true, "gift_message": "Here is your package, Tim! Enjoy!",'+
        '"shipping_method":"cheapest"}';



        xmlHttp = new XMLHttpRequest();  
        xmlHttp.open( "POST", url, false );
        xmlHttp.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        
        xmlHttp.send(jsonOrder);

        var requestIDJSON = JSON.parse(xmlHttp.responseText);

        var requestID = requestIDJSON.request_id;
        
        getOrderRequest(requestID);

    
        return requestID;

    }


    function getOrderRequest(requestID){

        var url = "https://api.zinc.io/v1/orders/"+requestID;
                
       
        xmlHttp2 = new XMLHttpRequest();  
        xmlHttp2.open( "GET", url, false );
        xmlHttp2.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        xmlHttp2.responseType = 'json';
        xmlHttp2.send();

        var orderRequestJSON = JSON.parse(xmlHttp2.responseText);


        return orderRequestJSON;

    }

