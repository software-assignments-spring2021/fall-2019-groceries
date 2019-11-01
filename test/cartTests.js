const assert = require('chai').assert;
const {Item} = require("../src/item");
const {Cart, CartItem} = require("../src/cart");

describe('Cart tests', function() {
	var cart;
	var avocado;

	beforeEach(function() {
	 	cart = new Cart();
	 	avocado = new Item();	
		avocado.setCost(5);
		avocado.setId("1");
		avocado.setLink("amazon.com/avocado");
		avocado.setName("avocado");

	 	apple = new Item();
		apple.setCost(5);
		apple.setId("2");
		apple.setLink("amazon.com/apple");
		apple.setName("apple");
	});	

	it('test cart initially has no items', function() {
		assert.equal(cart.size(), 0);
	});

	it('test add valid item to cart', function() {
		cart.addItem(avocado, 2);
		assert.equal(cart.size(), 1);
	});

	it('test cannot add invalid item to cart', function() {
		cart.addItem(new Item(), 2);
		assert.equal(cart.size(), 0);
	});

	it('test get item quantity', function() {
		cart.addItem(avocado, 2);
		assert.equal(cart.getItemQuantity(avocado), 2);
	});

	it('test remove item from cart', function() {
		cart.addItem(avocado, 2);
		cart.removeItem(avocado);
		assert.equal(cart.size(), 0);
	});

	it('test remove all items from cart', function() {
		cart.addItem(avocado, 2);
		cart.addItem(apple, 2);
		cart.removeAllItems();
		assert.equal(cart.size(), 0);
	});

	it('test cart subtotal', function() {
		avocado.setCost(100);
		cart.addItem(avocado, 2);
		assert.equal(cart.getSubtotal(), 200);
	});

	it('test toString displays item names and quantities with newline seperation', 
		function() {
			cart.addItem(avocado, 2);
			cart.addItem(apple, 2);
			const expectedString = "Item: avocado Quantity: 2\nItem: apple Quantity: 2\n";
			assert.equal(cart.toString(), expectedString);
	});
});