const {AddCartItemResponse, DisplayProductSearchResponse, DisplayUserAliasesResponse, DisplayUserCartResponse} = require("./userResponses");
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
		
		const userCart =  this.database.getUserCart(user);
				
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