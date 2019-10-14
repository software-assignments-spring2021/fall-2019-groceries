const assert = require('chai').assert;
const {Item} = require("../src/item");
const {Cart, CartItem} = require("../src/cart");

describe('Cart tests', function() {
	var my_cart;
	var avocado;

	beforeEach(function() {
	 	my_cart = new Cart();
	 	avocado = new Item();	 	
	 	avocado.setId("123");

	 	apple = new Item();
	 	apple.setId("456");
	});	

	it('test cart initially has no items', function() {
		assert.equal(my_cart.size(), 0);
	});

	it('test add item to cart', function() {
		my_cart.addItem(avocado, 2);
		assert.equal(my_cart.size(), 1);
	});

	it('test get item quantity', function() {
		my_cart.addItem(avocado, 2);
		assert.equal(my_cart.getItemQuantity(avocado), 2);
	});

	it('test remove item from cart', function() {
		my_cart.addItem(avocado, 2);
		my_cart.removeItem(avocado);
		assert.equal(my_cart.size(), 0);
	});

	it('test remove all items from cart', function() {
		my_cart.addItem(avocado, 2);
		my_cart.addItem(apple, 2);
		my_cart.removeAllItems();
		assert.equal(my_cart.size(), 0);
	});

	it('test cart subtotal', function() {
		avocado.setCost(100);
		my_cart.addItem(avocado, 2);
		assert.equal(my_cart.getSubtotal(), 200);
	});
});