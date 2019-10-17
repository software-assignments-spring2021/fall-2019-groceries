const assert = require('chai').assert;
const {Item} = require("../src/item");

describe('Item tests', function() {

	var myItem;

	beforeEach(function() {
	 	myItem = new Item();
	});	

	it('test item cost modification', function() {
		myItem.setCost(5);
		assert.equal(myItem.getCost(), 5);
	});

	it('test item cost non-negativity', function() {
		myItem.setCost(-5);
		assert.equal(myItem.getCost(), null);
	});

	it('test item id modification', function() {
		myItem.setId("1");
		assert.equal(myItem.getId(), "1");
	});

	it('test item link modification', function() {
		myItem.setLink("amazon.com/myItem");
		assert.equal(myItem.getLink(), "amazon.com/myItem");
	});

	it('test item name modification', function() {
		myItem.setName("avocado");
		assert.equal(myItem.getName(), "avocado");
	});
});
