const assert = require('chai').assert;
const expect = require('chai').expect;

const {Customer} = require("../src/customer");
const {DatabaseAdapter} = require("../src/databaseAdapter");
const {AddCartItemRequest, 
	   AddUserAliasRequest,
	   DisplayProductSearchRequest, 
	   DisplayUserAliasesRequest, 
	   DisplayUserCartRequest} = require("../src/userRequests");
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

	onAddCartItemResponse(response) {
		this.lastResponse = response;
		return true;
	}

	onAddUserAliasResponse(response) {
		this.lastResponse = response;
		return true;
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

	it('Test adds item to cart from bot request', function() {
		var originalQuantity;
		
		// first, get the existing cart and track the existing number of items
		request = new DisplayUserCartRequest();
		request.setUser(user);
		requestProcessor.onDisplayUserCartRequest(request);
		bot.getLastResponse().getResponseText()
		.then((response) => {			
			originalQuantity = response[0]['quantity'];
		})

		request = new AddCartItemRequest();
		request.setUser(user);
		request.setItemAlias('apple');
		request.setItemQuantity(5);

		return requestProcessor.onAddCartItemRequest(request)
		.then(() => {
			var propagatedCart = bot.getLastResponse().getResponseText();
			expect(propagatedCart[0]['quantity']).to.equal(originalQuantity + 5);
		})
	});

	it('Test adds user alias from bot request', function() {
		request = new AddUserAliasRequest();
		request.setUser(user);
		request.setAliasName('my favorite apple');
		request.setAliasLink('amazon.com/apple');

		return requestProcessor.onAddUserAliasRequest(request)
		.then(() => {
			var propagatedAliases = bot.getLastResponse().getResponseText()
			expect(propagatedAliases[2]['link']).to.equal('amazon.com/apple');
			expect(propagatedAliases[2]['name']).to.equal('my favorite apple');
		})
	});
});