const {AddCartItemResponse, DisplayUserAliasesResponse, DisplayUserCartResponse} = require("./userResponses");

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

	async onDisplayUserCartRequest(request) {
        const user = request.getUser();
        if (user === null) {
            return;
        }

        // get the user's cart from Mongo without blocking
        const userCart = await this.database.getUserCart(user);

        var responseText;
        if (userCart === null) {
        	responseText = "User cart is empty";
        }
        else {
        	responseText = userCart.toString();
        }

        // populate response to send to bot
        var userResponse = new DisplayUserCartResponse();
        userResponse.setUser(user);
        userResponse.setResponseText(responseText);
                
        // send response to bot without blocking
        const success = await bot.onDisplayUserCartResponse(userResponse);
    }

    async onDisplayUserAliasesRequest(request) {
    	const user = request.getUser();
    	if (user === null) {
    		return;
    	}

    	// populate response to send to bot
    	var userResponse = new DisplayUserAliasesResponse();
    	userResponse.setUser(user);

    	// get the user's aliases from database without blocking
    	const userAliases = await this.database.getUserAliases(user);
    	var responseText = "";

    	if (userAliases === null) {
    		responseText += "User does not have any aliases defined";
    	}
    	else {
    		for (let userAlias of userAliases) {
    			const aliasedItem = alias.getItem();
    			responseText += userAlias.getName() + ": " + aliasedItem.getName();
    			responseText += "\n";
    		}
    	}    	

    	// send response to bot without blocking
    	userResponse.setResponseText(responseText);    	
    	const success = await bot.onDisplayUserAliasesResponse(userResponse);
    }
}

module.exports = {
	RequestProcessor
};