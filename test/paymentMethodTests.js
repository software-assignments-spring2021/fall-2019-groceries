const assert = require('chai').assert;
const {PaymentMethod} = require("../src/paymentMethod");

describe('PaymentMethod tests', function() {

	var paymentMethod;

	beforeEach(function() {
	 	paymentMethod = new PaymentMethod();
	});	

	it('test expiration modification', function() {
		paymentMethod.setExpiration(5, 3000);
		assert.equal(paymentMethod.getExpirationMonth(), 5);
		assert.equal(paymentMethod.getExpirationYear(), 3000);
	});

	it('test expiration month must be >= 1', function() {
		paymentMethod.setExpiration(0, 2019);
		assert.isNull(paymentMethod.getExpirationMonth());
		assert.isNull(paymentMethod.getExpirationYear());
	});

	it('test expiration month must be <= 12', function() {
		paymentMethod.setExpiration(13, 2019);
		assert.isNull(paymentMethod.getExpirationMonth());
		assert.isNull(paymentMethod.getExpirationYear());
	});

	it('test expiration date must not have passed', function() {
		paymentMethod.setExpiration(5, 2018);
		assert.isNull(paymentMethod.getExpirationMonth());
		assert.isNull(paymentMethod.getExpirationYear());
	});

	it('test name on card modification', function() {
		paymentMethod.setNameOnCard("James Bond");
		assert.equal(paymentMethod.getNameOnCard(), "James Bond");
	});

	it('test number modification', function() {
		paymentMethod.setNumber(7);
		assert.equal(paymentMethod.getNumber(), 7);
	});

	it('test security code modification', function() {
		paymentMethod.setSecurityCode(7);
		assert.equal(paymentMethod.getSecurityCode(), 7);
	});
});