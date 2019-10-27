const assert = require('chai').assert;
const sinon = require('sinon');

const {DisplayUserCartRequest} = require("../src/userRequests");
const {RequestProcessor} = require('../src/requestProcessor');

describe('RequestProcessor tests', function() {
	var bot;
	var database;
	var request;
	var requestProcessor;

	beforeEach(function() {
		bot = sinon.fake();
		database = sinon.fake();

		request = new DisplayUserCartRequest();
		requestProcessor = new RequestProcessor();
		requestProcessor.setBot(bot);
		requestProcessor.setDatabase(database);
	});

	it('Test onDisplayUserCartRequest does not respond to bot', function() {
		requestProcessor.onDisplayUserCartRequest(request);
		assert(bot.notCalled);
	});
});
