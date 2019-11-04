const assert = require('chai').assert;
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {Customer} = require("../src/customer");

describe('Database Adapter tests', function() {
	var databaseAdapter;
	var customer;

	beforeEach(function() {
		databaseAdapter = new DatabaseAdapter();
		customer = new Customer();
		customer.setId("finaltesting");
	});

	it('test getUserCart', async function() {
		var cart = await databaseAdapter.getUserCart(customer);
		assert.isOk(cart);
	});

	it('test getUserAliases', async function() {
		var aliases = await databaseAdapter.getUserAliases(customer);
		assert.isOk(aliases);
	});
});