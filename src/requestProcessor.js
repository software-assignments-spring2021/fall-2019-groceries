const {AddCartItemResponse, 
	   AddUserAliasResponse,
	   DisplayProductSearchResponse, 
	   DisplayUserAliasesResponse, 
	   DisplayUserCartResponse} = require("./userResponses");
var sleep = require('system-sleep');

class RequestProcessor {
	constructor() {
		this.bot = null;
		this.database = null;
		this.marketplace = null;
	}

	setBot(bot) {
		this.bot = bot;
	}

	setDatabase(database) {
		this.database = database;
	}

	setMarketplace(marketplace) {
		this.marketplace = marketplace;
	}

	onAddUserAliasRequest(request) {
		var userResponse = new AddUserAliasResponse();
		const user = request.getUser();
		userResponse.setUser(user);

		if (user === null) {
			userResponse.setResponseText("User is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		const aliasName = request.getAliasName();
		const aliasLink = request.getAliasLink();

		if (aliasName === null) {
			userResponse.setResponseText("Alias item is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		if (aliasLink === null) {
			userResponse.setResponseText("Alias link is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		return new Promise((resolve, reject) => {
			this.database.getUserAliases(user)
			.then((userAliases) => {
				var newAliasJSON = [];
				for (let alias of userAliases) {
					if (alias['name'] === aliasName) {
						continue;
					}
					else {
						newAliasJSON.push({
							'name' : alias['name'], 
							'link' : alias['link']
						});
					}
				}

				newAliasJSON.push({'name': aliasName, 'link': aliasLink});

				this.database.setUserAliasesFromJSON(user, newAliasJSON)
				.then(() => {
					this.database.getUserAliases(user)
					.then((newAliases) => {
						userResponse.setResponseText(newAliases);
						this.bot.onAddUserAliasResponse(userResponse);
						return resolve();
					})
				})
			})
		});
	}

	onSetUserAliasRequest(request) {
		var userResponse = new AddUserAliasResponse();
		const user = request.getUser();
		userResponse.setUser(user);

		if (user === null) {
			userResponse.setResponseText("User is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		const aliasName = request.getAliasName();
		const aliasLink = request.getAliasLink();

		if (aliasName === null) {
			userResponse.setResponseText("Alias item is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		if (aliasLink === null) {
			userResponse.setResponseText("Alias link is not defined");
			this.bot.onAddUserAliasResponse(userResponse);
			return;
		}

		return new Promise((resolve, reject) => {
			this.database.getUserAliases(user)
			.then((userAliases) => {
				var newAliasJSON = [];
				for (let alias of userAliases) {
					if (alias['name'] === aliasName) {
						continue;
					}
					else {
						newAliasJSON.push({
							'name' : alias['name'], 
							'link' : alias['link']
						});
					}
				}

				newAliasJSON.push({'name': aliasName, 'link': aliasLink});

				this.database.setUserAliasesFromJSON(user, newAliasJSON)
				.then(() => {
					this.database.getUserAliases(user)
					.then((newAliases) => {
						userResponse.setResponseText(newAliases);
						this.bot.onAddUserAliasResponse(userResponse);
						return resolve();
					})
				})
			})
		});
	}

	onAddCartItemRequest(request) {
		var userResponse = new AddCartItemResponse();
		const user = request.getUser();
		userResponse.setUser(user);

		if (user === null) {
			userResponse.setResponseText("User is not defined");
			this.bot.onAddCartItemResponse(userResponse);
			return;
		}

		const itemAlias = request.getItemAlias();
		const itemQuantity = request.getItemQuantity();

		if (itemAlias === null) {
			userResponse.setResponseText("Item alias is null");
			this.bot.onAddCartItemResponse(userResponse);
    		return;
		}

		return new Promise((resolve, reject) => {
			this.database.getUserAliases(user)
			.then((userAliases) => {
				var aliasFound = false;
				const numAliases = Object.keys(userAliases).length;
				
				for (let i = 0; i < numAliases; i++) {
					if (userAliases[i]['name'] == itemAlias) {
						aliasFound = true;
						break;
					}
				}
	
				if (!aliasFound) {
					userResponse.setResponseText("Unknown alias: " + alias);
					this.bot.onAddCartItemResponse(userResponse);
					return;
				}
	
				if (itemQuantity == null || itemQuantity < -1) {
					userResponse.setResponseText("Item quantity is null");
					this.bot.onAddCartItemResponse(userResponse);
					return;
				}
		
				this.database.getUserCart(user)
				.then((userCart) => {
					var itemFound = false;
					const numCartItems = Object.keys(userCart).length;
					for (let i = 0; i < numCartItems; i++) {
						if (userCart[i]['name'] == itemAlias) {
							userCart[i]['quantity'] += itemQuantity;
							itemFound = true;
							break;
						}
					}
	
					if (!itemFound) {
						userCart.push({'name' : itemAlias, 'quantity' : itemQuantity});
					}
	
					userCart = {'items' : userCart};
	
					this.database.setUserCartFromJSON(user, userCart)
					.then(() => {
						this.database.getUserCart(user)
						.then((updatedCart) => {
							userResponse.setResponseText(updatedCart);
							this.bot.onAddCartItemResponse(userResponse);
							return resolve();
						})					
					}) 				
				});	
			})
		})
	}

	onDisplayProductSearchRequest(request) {
		var userResponse = new DisplayProductSearchResponse();
		const user = request.getUser();
		userResponse.setUser(user);

		if (user === null) {
			userResponse.setResponseText("User is not defined");
			this.bot.onDisplayProductSearchResponse(userResponse);
    		return;
		} 
		
		const productName = request.getProductName();

		if (productName === null) {
			userResponse.setResponseText("Product name is null");
			this.bot.onDisplayProductSearchResponse(userResponse);
    		return;
		}

		const productSearchResults = this.marketplace.getProductSearchResults(productName);

		if (productSearchResults === null) {
			userResponse.setResponseText("Product search for " + productName + " failed.");
		}
		else {
			userResponse.setResponseText(productSearchResults);
		}

		this.bot.onDisplayProductSearchResponse(userResponse);
	}

	onDisplayUserAliasesRequest(request) {
		var userResponse = new DisplayUserAliasesResponse();
		const user = request.getUser();
		userResponse.setUser(user);	
		
    	if (user === null) {
			userResponse.setResponseText("User is not defined");
			this.bot.onDisplayUserAliasesResponse(userResponse);
    		return;
    	}    	
		
		const userAliases = this.database.getUserAliases(user);

    	if (userAliases === null) {
    		userResponse.setResponseText("User does not have any aliases defined");
    	}
    	else {
    		userResponse.setResponseText(userAliases);
    	}    	

    	this.bot.onDisplayUserAliasesResponse(userResponse);
	}

	onDisplayUserCartRequest(request) {
		var userResponse = new DisplayUserCartResponse();
		const user = request.getUser();		
		userResponse.setUser(user);
		
        if (user === null) {
			userResponse.setResponseText("User is not defined");
			const success = this.bot.onDisplayUserCartResponse(userResponse);
            return;
		}
			
		const userCart = this.database.getUserCart(user);
				
        if (userCart === null) {
        	userResponse.setResponseText("User cart is empty");
        }
        else {
        	userResponse.setResponseText(userCart);
        }

        // send response to bot without blocking
        this.bot.onDisplayUserCartResponse(userResponse);
    }
}

module.exports = {
	RequestProcessor
};