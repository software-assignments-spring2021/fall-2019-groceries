const assert = require('chai').assert;
const {Item} = require("../src/item");

describe('Item tests', function() {

	var item;

	beforeEach(function() {
	 	item = new Item();
	});	

	it('test item cost modification', function() {
		item.setCost(5);
		assert.equal(item.getCost(), 5);
	});

	it('test item cost non-negativity', function() {
		item.setCost(-5);
		assert.equal(item.getCost(), null);
	});

	it('test item id modification', function() {
		item.setId("1");
		assert.equal(item.getId(), "1");
	});

	it('test item link modification', function() {
		item.setLink("amazon.com/item");
		assert.equal(item.getLink(), "amazon.com/item");
	});

	it('test item name modification', function() {
		item.setName("avocado");
		assert.equal(item.getName(), "avocado");
	});

	it('test item with no fields defined is invalid', function() {
		assert.isFalse(item.isValid());
	});

	it('test item with all fields defined is valid', function() {
		item.setCost(5);
		item.setId("1");
		item.setLink("amazon.com/item");
		item.setName("avocado");
		assert.isTrue(item.isValid());
	});
});
