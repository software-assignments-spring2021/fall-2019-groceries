class Alias {
    constructor() {
        this.cart = null;
        this.customer = null;
        this.id = null;       
        this.name = null;        
    }

    getCart() {
        return this.cart;
    }

    setCart(cart) {
        this.cart = cart;
    }

    getCustomer() {
        return this.customer;
    }

    setCustomer(customer) {
        this.customer = customer;
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
    Alias
};