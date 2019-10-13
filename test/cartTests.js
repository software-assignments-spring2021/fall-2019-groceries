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
	});	

	it('test add item to cart', function() {
		assert.equal(my_cart.size(), 0);
		my_cart.addItem(avocado);
		assert.equal(my_cart.size(), 1);
	});
});