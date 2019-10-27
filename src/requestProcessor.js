const {DisplayUserCartResponse} = require("./userResponses");

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
        var userCart = await database.getUserCart(user);

        var userResponse = DisplayUserCartResponse();
        userResponse.setUser(user);
        userResponse.setResponseText(userCart.toString());
                
        // send response to bot without blocking
        var success = await bot.onDisplayUserCartResponse(userResponse);
    }
}

module.exports = {
	RequestProcessor
};