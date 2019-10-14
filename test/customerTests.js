const assert = require('chai').assert;
const {Cart} = require("../src/cart");
const {Customer} = require("../src/customer");

describe('Customer tests', function() {
	var customer;
	const cart = new Cart();

	beforeEach(function() {
		customer = new Customer();
	});	

	it('test customer cart modification', function() {
		customer.setCart(cart);
		assert.equal(customer.getCart(), cart);
	});

	it('test customer id modification', function() {
		customer.setId("007");
		assert.equal(customer.getId(), "007");
	});

	it('test customer name modification', function() {
		customer.setName("James Bond");
		assert.equal(customer.getName(), "James Bond");
	});
});