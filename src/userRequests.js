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

class DisplayUserCartRequest extends UserRequest {

}

module.exports = {
    DisplayUserCartRequest
};