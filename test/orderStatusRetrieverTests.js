const assert = require('chai').assert;
const expect = require('chai').expect;
const {OrderStatusRetriever} = require("../src/orderStatusRetriever");

describe('OrderStatusRetriever tests', function() {
    var orderStatusRetriever = new OrderStatusRetriever();

    it('Test retrieves orders', function() {
        orderStatusRetriever.retrieveOrderStatus()
        .then((orders) => {
            // Example usage:
            // for (let order of orders) {
            //     console.log("Order #" + order['request_id'] + "\nCreated At: " + order['_created_at']);
            //     for (let product of order['request']['products'])
            //         console.log("\tQuantity: " + product['quantity'] + " Id: " + product['product_id']);
            // }      
            return expect(orders[0]).to.have.property("request_id");      
        })        
    });
    
    it('Test gets item data', function(){
        orderStatusRetriever.getItemData('B07XR5TRSZ')
        .then((itemData) => {
            return expect(itemData).to.have.property("request_id");    
        });
    });
})