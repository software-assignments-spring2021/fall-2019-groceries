class UserRequest {
	constructor() {
		this.requestText = null;
		this.user = null;
	}

	getRequestText() {
		return this.requestText;
	}

	setRequestText(requestText) {
		this.requestText = requestText;
	}

	getUser() {
		return this.user;
	}

	setUser(user) {
		this.user = user;
	}
}

class DisplayUserAliasesRequest extends UserRequest {
	constructor() {
		super();
	}
}

class DisplayUserCartRequest extends UserRequest {
	constructor() {
		super();
	}
}

module.exports = {
	DisplayUserAliasesRequest,
    DisplayUserCartRequest
};