const assert = require('chai').assert;
const {OrderStatusRetriever} = require("../src/orderStatusRetriever");

describe('OrderStatusRetriever tests', function() {
    var orderStatusRetriever = new OrderStatusRetriever();

    it('test item cost modification', function() {
        orderStatusRetriever.retrieveOrderStatus()
        .then((orderStatus) => {
            console.log(orderStatus);
        })        
	});
})