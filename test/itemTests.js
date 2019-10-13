const assert = require('chai').assert;
const {Item} = require("../src/item");

describe('Item tests', function() {

	var my_item;

	beforeEach(function() {
	 	my_item = new Item();
	});	

	it('test item cost modification', function() {
		my_item.setCost(5);
		assert.equal(my_item.getCost(), 5);
	});

	it('test item id modification', function() {
		my_item.setId(1);
		assert.equal(my_item.getId(), 1);
	});

	it('test item link modification', function() {
		my_item.setLink("amazon.com/my_item");
		assert.equal(my_item.getLink(), "amazon.com/my_item");
	});

	it('test item name modification', function() {
		my_item.setName("avocado");
		assert.equal(my_item.getName(), "avocado");
	});
});
