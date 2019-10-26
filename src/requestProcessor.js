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
}

module.exports = {
	RequestProcessor
};