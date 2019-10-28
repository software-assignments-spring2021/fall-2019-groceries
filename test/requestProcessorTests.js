const assert = require('chai').assert;
const sinon = require('sinon');

const {Cart} = require("../src/cart");
const {DisplayUserCartRequest} = require("../src/userRequests");
const {RequestProcessor} = require('../src/requestProcessor');


class MockDatabase {
	constructor(cart) {
		this.cart = cart;
	}

	getUserCart(user) {
		return this.cart;
	}
}

describe('RequestProcessor tests', function() {
	var bot;
	var cart;
	var database;
	var user;
	var request;
	var requestProcessor;

	beforeEach(function() {
		bot = sinon.fake();
		cart = new Cart();		

		var databaseAPI = {getUserCart: function(user) {return cart} };
		database = sinon.mock(databaseAPI);
		user = sinon.fake();

		request = new DisplayUserCartRequest();
		requestProcessor = new RequestProcessor();
		requestProcessor.setBot(bot);
		requestProcessor.setDatabase(database);
	});

	it('Test onDisplayUserCartRequest does not respond to bot', function() {
		requestProcessor.onDisplayUserCartRequest(request);
		assert(bot.notCalled);
	});

	it('Test onDisplayUserCartRequest returns cart on well-formed request', function() {
		request.setUser(user);
		requestProcessor.onDisplayUserCartRequest(request);
		assert(bot.calledOnce);
	});
});