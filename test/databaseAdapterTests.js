const assert = require('chai').assert;
const {Address} = require("../src/address");
const {Alias} = require("../src/alias");
const {Cart} = require("../src/cart");
const {Customer} = require("../src/customer");
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {Item} = require("../src/item");

describe('Database Adapter tests', function() {
	var databaseAdapter;
	var customer;
	var apple;
	var pear;

	beforeEach(function() {
		databaseAdapter = new DatabaseAdapter();
		customer = new Customer();
		customer.setId("finaltesting");

		apple = new Item();
		apple.setLink("amazon.com/apple");
		apple.setCost(5);
		apple.setName("apple");
		apple.setId("123");

		pear = new Item();
		pear.setLink("amazon.com/pear");
		pear.setCost(5);
		pear.setName("pear");
		pear.setId("456");
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
		var userCart = new Cart();
		userCart.addItem(apple);
		userCart.addItem(pear);

		customer.setId("mdc");
		databaseAdapter.setUserCart(customer, userCart);
		
		var propagatedCart = await databaseAdapter.getUserCart(customer);
		
		assert.equal(propagatedCart[0]['name'], 'apple');
		assert.equal(propagatedCart[1]['name'], 'pear');
	});

	it('test setUserAliases', async function() {
		var userAliases = [];
		var alias1 = new Alias();
		alias1.setName("apple");
		alias1.setCustomer("mdc");

		alias1.setItem(apple);
		userAliases.push(alias1);

		var alias2 = new Alias();
		alias2.setName("pear");
		alias2.setCustomer("mdc");

		alias2.setItem(pear);
		userAliases.push(alias2);

		customer.setId("mdc");
		databaseAdapter.setUserAliases(customer, userAliases);

		var propagatedAliases = await databaseAdapter.getUserAliases(customer);
		
		assert.equal(propagatedAliases[0]['name'], 'apple');
		assert.equal(propagatedAliases[1]['name'], 'pear');
	});
});