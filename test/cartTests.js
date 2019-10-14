const assert = require('chai').assert;
const {Item} = require("../src/item");
const {Cart, CartItem} = require("../src/cart");

describe('Cart tests', function() {
	var cart;
	var avocado;

	beforeEach(function() {
	 	cart = new Cart();
	 	avocado = new Item();	 	
	 	avocado.setId("123");

	 	apple = new Item();
	 	apple.setId("456");
	});	

	it('test cart initially has no items', function() {
		assert.equal(cart.size(), 0);
	});

	it('test add item to cart', function() {
		cart.addItem(avocado, 2);
		assert.equal(cart.size(), 1);
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
});