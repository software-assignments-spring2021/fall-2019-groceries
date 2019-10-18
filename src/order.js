class Order {
    constructor() {
        this.billingAddress = null;
        this.customer = null;
        this.id = null;       
        this.shippingAddress = null;
    }

    getBillingAddress() {
        return this.billingAddress;
    }

    setBillingAddress(billingAddress) {
        this.billingAddress = billingAddress;
    }

    getCart() {
        return this.customer.getCart();
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

    getShippingAddress() {
        return this.shippingAddress;
    }

    setShippingAddress(shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    isValid() {
        const hasNullAttribute = this.billingAddress === null ||
               this.cart === null ||
               this.customer === null ||
               this.id === null ||
               this.shippingAddress === null;

        if (hasNullAttribute) {
            return false;
        }

        const hasValidAttributes = this.billingAddress.isValid() &&
                                   this.cart.size() > 0 &&
                                   this.customer.isValid() &&
                                   this.shippingAddress.isValid();

        return hasValidAttributes;
    }
}

module.exports = {
    Order
};