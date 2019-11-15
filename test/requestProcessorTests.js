const assert = require('chai').assert;
const expect = require('chai').expect;

const {Customer} = require("../src/customer");
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {DisplayProductSearchRequest, DisplayUserAliasesRequest, DisplayUserCartRequest} = require("../src/userRequests");
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

	onDisplayProductSearchResponse(response) {
		this.lastResponse = response;
		return true;
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

/*
	In lieu of Sinon not working, make our own marketplace mock
*/
class MockMarketplace {
	getProductSearchResults(productName) {
		var mockResults = [];
		mockResults.push({
			"name": "Organic Apples",
			"link": "amazon.com/organic-apples",
			"price": 5
		});

		mockResults.push({
			"name": "Regular Apples",
			"link": "amazon.com/regular-apples",
			"price": 3
		});

		return new Promise((resolve, reject) => {
			return resolve(JSON.stringify(mockResults));
		});
	}
}

describe('RequestProcessor tests', function() {
	var bot;
	var database;
	var marketplace;
	var request;
	var user;	

	beforeEach(function() {
		bot = new MockBot();
		database = new DatabaseAdapter();
		marketplace = new MockMarketplace();

		user = new Customer();
		user.setId("mdc");

		requestProcessor = new RequestProcessor();
		requestProcessor.setBot(bot);
		requestProcessor.setDatabase(database);
		requestProcessor.setMarketplace(marketplace);
	});

	it('Test replies with correct user aliases', function() {
		request = new DisplayUserAliasesRequest();
		request.setUser(user);

		requestProcessor.onDisplayUserAliasesRequest(request);

		return bot.getLastResponse().getResponseText()
		.then((response) => {
			expect(response[0]['link']).to.equal('amazon.com/apple');
		});
	});

	it('Test replies with correct user cart', function() {
		request = new DisplayUserCartRequest();
		request.setUser(user);

		requestProcessor.onDisplayUserCartRequest(request);

		return bot.getLastResponse().getResponseText()
		.then((response) => {
			expect(response[0]['name']).to.equal('apple');
		})
	});

	it('Test forwards product search request', function() {
		request = new DisplayProductSearchRequest();
		request.setUser(user);
		request.setProductName("Apples");
		
		requestProcessor.onDisplayProductSearchRequest(request);

		return bot.getLastResponse().getResponseText()
		.then((response) => {
			expect(JSON.parse(response)[0]['name']).to.equal('Organic Apples');
		})
	});
});