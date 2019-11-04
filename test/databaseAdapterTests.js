const assert = require('chai').assert;
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {Address} = require("../src/address");
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

	it('test getUserData', async function() {
		var userData = await databaseAdapter.getUserData(customer);		
		assert.equal(userData["password"], "password");
	});

	it('test addUser', async function() {
		var newCustomer = new Customer();
		newCustomer.setId("mdc");
		newCustomer.setUsername("mdc");
		newCustomer.setPassword("$$$");
		newCustomer.setName("mdc");

		var userAddress = new Address();
		userAddress.setAddressLine1("55 East 84th Street");
		userAddress.setPhoneNumber("11111");
		newCustomer.setAddress(userAddress);

		var response = await databaseAdapter.addUser(newCustomer);	
		var userData = await databaseAdapter.getUserData(newCustomer);
		assert.equal(userData["password"], "$$$");
	});

	it('test setUserCart', async function() {
		var userCart = {};
	});

	it('test setUserAliases', async function() {
		var userAliases = {};
	});
});