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

class AddCartItemResponse extends UserResponse {
	constructor() {
		super();
	}
}

class AddUserAliasResponse extends UserResponse {
	constructor() {
		super();
	}
}

class DisplayProductSearchResponse extends UserResponse {
	constructor() {
		super();
		this.productName = null;
	}

	getProductName() {
		return this.productName;
	}

	setProductName(productName) {
		this.productName = productName;
	}	
}

class DisplayUserAliasesResponse extends UserResponse {
	constructor() {
		super();
	}
}

class DisplayUserCartResponse extends UserResponse {
	constructor() {
		super();
	}
}

module.exports = {
	AddCartItemResponse,
	AddUserAliasResponse,
	DisplayProductSearchResponse,
	DisplayUserAliasesResponse,
	DisplayUserCartResponse
}