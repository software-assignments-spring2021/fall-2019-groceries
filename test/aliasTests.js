const assert = require('chai').assert;
const {Alias} = require("../src/alias");
const {Cart} = require("../src/cart");
const {Customer} = require("../src/customer");

describe('Alias tests', function() {
	var alias;

	const cart = new Cart();
	const customer = new Customer("007", "James Bond");

	beforeEach(function() {
		alias = new Alias();
	});	

	it('test alias cart modification', function() {
		alias.setCart(cart);
		assert.equal(alias.getCart(), cart);
	});

	it('test alias customer modification', function() {
		alias.setCustomer(customer);
		assert.equal(alias.getCustomer(), customer);
	});

	it('test alias id modification', function() {
		alias.setId("0xFFFF");
		assert.equal(alias.getId(), "0xFFFF");
	});

	it('test alias name modification', function() {
		alias.setName("Weekly avocado supply");
		assert.equal(alias.getName(), "Weekly avocado supply");
	});
});