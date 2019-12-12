class Order {
    constructor() {
        this.billingAddress = null;
        this.customer = null;
        this.id = null;
        this.paymentMethod = null;       
        this.shippingAddress = null;
        this.isGift = false;
        this.maxPrice = null;
    }

    getBillingAddress() {
        return this.billingAddress;
    }

    setBillingAddress(billingAddress) {
        if (billingAddress === null || !billingAddress.isValid()) {
            return;
        }

        this.billingAddress = billingAddress;
    }

    getCart() {
        return this.customer.getCart();
    }

    getCustomer() {
        return this.customer;
    }

    setCustomer(customer) {
        if (customer === null ) {
            return;
        }

        this.customer = customer;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod) {
        if (paymentMethod === null || !paymentMethod.isValid()) {
            return;
        }

        this.paymentMethod = paymentMethod;
    }

    setMaxPrice(maxPrice){
        this.maxPrice = maxPrice;

    }

    getMaxPrice(){
        return this.maxPrice;
    }


    setIsGift(isGift){

        this.isGift = isGift;


    }

    getIsGift(){

        return this.isGift;

    }

    getShippingAddress() {
        return this.shippingAddress;
    }

    setShippingAddress(shippingAddress) {
        if (shippingAddress === null || !shippingAddress.isValid()) {
            return;
        }

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
                                   this.customer.getCart().size() > 0 &&
                                   this.customer.isValid() &&
                                   this.paymentMethod.isValid() &&
                                   this.shippingAddress.isValid();

        return hasValidAttributes;
    }
}

module.exports = {
    Order
};