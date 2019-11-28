var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    
global.Buffer = global.Buffer || require('buffer').Buffer;


var user = "570FF481878B49158B137BD7";
var password = '';
var base64encodedData = new Buffer.from(user + ':' + password).toString('base64');


module.exports = {
        
    orderItem: function(order){

        var url = "https://api.zinc.io/v1/orders";

        var paymentMethod = order.getPaymentMethod();
        var shippingAddress = order.getShippingAddress();
        var billingAddress = order.getBillingAddress();
        var customer = order.getCustomer();
        var isGift = order.getIsGift();
        var maxPrice = order.getMaxPrice();
        
        var cart = order.getCart();

        var items = "";
       
        for (let cartItem of cart.getItems().values()) {

            items = items + '{ "product_id": "' + cartItem.getItem().getId()+'", "quantity": '+cartItem.getQuantity()+" }, ";
           
        }

        items = items.substring(0,items.length-2);

        var jsonOrder = '{ "retailer": "amazon", "products": ['+ items +
        ' ], "max_price":'+ maxPrice +', "shipping_address": { "first_name": "'+shippingAddress.getFirstName()+'", "last_name": "'+shippingAddress.getLastName()+'",'+
        '"address_line1": "'+shippingAddress.getAddressLine1()+'", "address_line2": "'+shippingAddress.getAddressLine2()+'","zip_code": "'+shippingAddress.getZipCode()+'", "city": "'+shippingAddress.getCity()+'",'+
        '"state": "'+shippingAddress.getState()+'", "country": "'+shippingAddress.getCountry()+'", "phone_number": "'+shippingAddress.getPhoneNumber()+'" }, "payment_method": { "name_on_card": "'+paymentMethod.getNameOnCard()+'",'+
        '"number": "'+paymentMethod.getNumber()+'", "security_code": "'+paymentMethod.getSecurityCode()+'", "expiration_month": '+paymentMethod.getExpirationMonth()+', "expiration_year": '+paymentMethod.getExpirationYear()+', "use_gift": false},'+
        '"retailer_credentials": { "email": "'+customer.getUsername()+'", "password": "'+customer.getPassword()+'" },'+
        '"billing_address": { "first_name": "'+billingAddress.getFirstName()+'", "last_name": "'+billingAddress.getLastName()+'", "address_line1": "'+billingAddress.getAddressLine1()+'","address_line2": "'+billingAddress.getAddressLine2()+'",'+
        '"zip_code": "'+billingAddress.getZipCode()+'","city": "'+billingAddress.getCity()+'","state": "'+billingAddress.getState()+'","country": "'+billingAddress.getCountry()+'","phone_number": "'+billingAddress.getPhoneNumber()+'"},'+
        '"is_gift":'+ isGift +', '+'"shipping_method":"cheapest"}';


        xmlHttp = new XMLHttpRequest();  
        xmlHttp.open( "POST", url, false );
        xmlHttp.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        
        xmlHttp.send(jsonOrder);

        var requestIDJSON = JSON.parse(xmlHttp.responseText);

        var requestID = requestIDJSON.request_id;
        
       
        return requestID;

    },


    getOrderRequest: function(requestID){
    
        var url = "https://api.zinc.io/v1/orders/"+requestID;
                
       
        xmlHttp2 = new XMLHttpRequest();  
        xmlHttp2.open( "GET", url, false );
        xmlHttp2.setRequestHeader('Authorization', 'Basic '+base64encodedData);
        xmlHttp2.responseType = 'json';
        xmlHttp2.send();

        var orderRequestJSON = JSON.parse(xmlHttp2.responseText);


        return orderRequestJSON;

    }
    
}
