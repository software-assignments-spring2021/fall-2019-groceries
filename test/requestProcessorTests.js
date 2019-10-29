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
		cart = new Cart();
		user = sinon.fake();

		request = new DisplayUserCartRequest();
		requestProcessor = new RequestProcessor();
		
	});

	it('Test onDisplayUserCartRequest does not respond to bot', function() {
		bot = sinon.fake();
		requestProcessor.setBot(bot);

		var dbAPI = { getUserCart: function (user) {} };
		database = sinon.mock(dbAPI);
		requestProcessor.setDatabase(database);
		
		requestProcessor.onDisplayUserCartRequest(request);
		assert(bot.notCalled);
	});

	it('Test onDisplayUserCartRequest returns cart on well-formed request', function() {
		bot = sinon.fake();
		requestProcessor.setBot(bot);

		var dbAPI = { getUserCart: function (user) {} };
		database = sinon.mock(dbAPI);
		console.log(database);
		requestProcessor.setDatabase(database);

		request.setUser(user);
		requestProcessor.onDisplayUserCartRequest(request);
		assert(bot.calledOnce);
	});
});