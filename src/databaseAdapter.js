const request = require('request');

class DatabaseAdapter {
	constructor() {
		this.baseEndpoint = 'http://localhost:4000/';
	}

	async sendGetRequest(endpoint) {
		return new Promise((resolve, reject) => {
			request(endpoint, function(err, res, body) {
	    		return resolve(body);
			});	
		});	
	}

	async sendPostRequest(requestBody, endpoint) {
		return new Promise((resolve, reject) => {
			request.post({url: endpoint, form: requestBody}, 
				function(err, httpResponse, body) {
					return resolve(body);
				}
			);
		});	
	}

	async getUserCart(user) {
		const endpoint = this.baseEndpoint + 'carts/' + user.getId();
		
		// get user's cart without blocking
		var userCartJSON = await this.sendGetRequest(endpoint);
		return userCartJSON;
	}

	async setUserCart(user, cart) {
		var cartItems = {'items': []};
		const endpoint = this.baseEndpoint + 'carts/update/' + user.getId();

		for (let cartItem of cart.getItems()) {
			const item = cartItem.getItem();
			const itemName = item.getName();
			const itemEntry = {itemName : cartItem.getQuantity()};
			cartItems['items'].push(itemEntry);
		}

		var success = await this.sendPostRequest(cartItems, endpoint);
	}

	async getUserAliases(user) {
		const endpoint = this.baseEndpoint + 'aliases/' + user.getId();
		
		// get user aliases without blocking
		var userCartJSON = await this.sendGetRequest(endpoint);
		return userCartJSON;
	}

	async setUserAliases(user, aliases) {
		var userAliases = {'aliases': []};
		const endpoint = this.baseEndpoint + 'aliases/update/' + user.getId();

		for (let alias of aliases) {
			const aliasName = alias.getName();
			const aliasEntry = {aliasName : alias.getLink()};
			userAliases['aliases'].push(aliasEntry);
		}

		var success = await this.sendPostRequest(userAliases, endpoint);
	}
}

module.exports = {
	DatabaseAdapter
};