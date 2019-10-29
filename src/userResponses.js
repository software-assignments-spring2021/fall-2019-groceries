class UserResponse {
	constructor() {
		this.responseText = null;
		this.user = null;
	}

	getResponseText() {
		return this.responseText;
	}

	setResponseText(responseText) {
		this.responseText = responseText;
	}

	getUser() {
		return this.user;
	}

	setUser(user) {
		this.user = user;
	}
}

class DisplayUserCartResponse extends UserResponse {
	constructor() {
		super();
	}
}

module.exports = {
	DisplayUserCartResponse
}