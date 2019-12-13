const assert = require('chai').assert;
const expect = require('chai').expect;
const {OrderStatusRetriever} = require("../src/orderStatusRetriever");

describe('OrderStatusRetriever tests', function() {
    var orderStatusRetriever = new OrderStatusRetriever();

    it('Test retrieves orders', function() {
        orderStatusRetriever.retrieveOrderStatus()
        .then((orders) => {
            return expect(orders[0]).to.have.property("request_id");      
        })        
    });

    it('Test retrieves order with specific id', function() {
        var resp = orderStatusRetriever.retrieveOrderStatusSync('dd18bc9e32f80f237c55579d18ac9d28'); 
        assert.equal(resp['request']['retailer'], 'amazon');
    });

    it('Test gets item data', function(){
        var itemData = orderStatusRetriever.getItemDataSync('B07XR5TRSZ');
        assert.isNotNull(itemData["title"]);
    });
})