class IBot {
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