const assert = require('chai').assert;
const expect = require('chai').expect;

const {Customer} = require("../src/customer");
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {DisplayUserAliasesRequest, DisplayUserCartRequest} = require("../src/userRequests");
const {RequestProcessor} = require('../src/requestProcessor');

/*
	In lieu of Sinon not working, make our own bot mock
*/
class MockBot {
	constructor() {
		this.lastResponse = null;
	}

	getLastResponse() {
		return this.lastResponse;
	}

	onDisplayUserAliasesResponse(response) {
		this.lastResponse = response;
		return true;
	}

	onDisplayUserCartResponse(response) {
		this.lastResponse = response;
		return true;
	}
}

describe('RequestProcessor tests', function() {
	var bot;
	var database;
	var request;
	var user;	

	beforeEach(function() {
		bot = new MockBot();
		database = new DatabaseAdapter();

		user = new Customer();
		user.setId("mdc");

		requestProcessor = new RequestProcessor();
		requestProcessor.setBot(bot);
		requestProcessor.setDatabase(database);
	});

	it('Test replies with correct user cart', function() {
		request = new DisplayUserCartRequest();
		request.setUser(user);

		requestProcessor.onDisplayUserCartRequest(request);

		return bot.getLastResponse().getResponseText()
		.then((response)=> {
			expect(response[0]['name']).to.equal('apple');
		})
	});

	it('Test replies with correct user aliases', function() {
		request = new DisplayUserAliasesRequest();
		request.setUser(user);

		requestProcessor.onDisplayUserAliasesRequest(request);

		return bot.getLastResponse().getResponseText()
		.then((response)=> {
			expect(response[0]['link']).to.equal('amazon.com/apple');
		})
	});
});