const assert = require('chai').assert;
const expect = require('chai').expect;

const OrderCancellationExeuctor = require('../src/orderCancellationExecutor').OrderCancellationExecutor;

describe('OrderCancellationExeuctor Tests', function() {
    it('Test cancel order', function() {
        const resp = OrderCancellationExeuctor.cancelOrder('dd18bc9e32f80f237c55579d18ac9d28', '');
        assert.equal(resp['data']['msg'], 'Request has not completed successfully');
    })
})