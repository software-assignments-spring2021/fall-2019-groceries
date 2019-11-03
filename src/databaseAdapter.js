const request = require('request');

class DatabaseAdapter {
	constructor() {
		this.baseEndpoint = 'http://localhost:4000/';
	}

	async getUserCart(user) {
		const endpoint = baseEndpoint + 'carts/' + user.getId();
		// get user's cart without blocking
		var userCartJSON = await sendGetRequest(endpoint);
		return userCartJSON;
	}

	async setUserCart(user, cart) {
		var cartItems = {'items', []};
		const endpoint = baseEndpoint + 'carts/update/' + user.getId();

		for (let cartItem of cart.getItems()) {
			const item = cartItem.getItem();
			const itemEntry = {item.getName() : cartItem.getQuantity()};
			cartItems['items'].push(itemEntry);
		}

		var success = await sendPostRequest(cartItems, endpoint);
	}

	async getUserAliases(user) {
		const endpoint = baseEndpoint + 'aliases/' + user.getId();
		// get user's cart without blocking
		var userCartJSON = await sendGetRequest(endpoint);
		return userCartJSON;
	}

	async setUserAliases(user, aliases) {
		var userAliases = {'aliases:', []};
		const endpoint = baseEndpoint + 'aliases/update/' + user.getId();

		for (let alias of aliases) {
			const aliasEntry = {alias.getName() : alias.getLink()};
			userAliases['aliases'].push(aliasEntry);
		}

		var success = await sendPostRequest(userAliases, endpoint);
	}

	async sendGetRequest(endpoint) {
		var responseBody;

		request(endpoint, function(err, res, body) {
    		responseBody = body;
		});

		return responseBody;
	}

	async sendPostRequest(requestBody, endpoint) {
		var responseBody;

		request.post({url: endpoint, form: requestBody}, function(err, httpResponse, body) {
			responseBody = body;
		});

		return responseBody;
	}
}