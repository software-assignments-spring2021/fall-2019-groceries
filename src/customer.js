class Customer {
    constructor() {  
        this.address = null;
        this.cart = null;      
    	this.id = null;
        this.name = null;       
        this.username = null;
        this.password = null; 
    }
    //id & name difference
    //cart object
    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    getCart() {
        return this.cart;
    }

    setCart(cart) {
        this.cart = cart;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
    	return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    isValid() {
        return this.cart !== null && 
        this.id !== null && 
        this.name !== null;
    }
}

module.exports = {
    Customer
};