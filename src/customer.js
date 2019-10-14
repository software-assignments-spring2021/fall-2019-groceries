class Customer {
    constructor() {  
        this.cart = null;      
    	this.id = null;
        this.name = null;        
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
}

module.exports = {
    Customer
};