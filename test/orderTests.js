const assert = require('chai').assert;
const {Address} = require("../src/address");
const {Cart} = require("../src/cart");
const {Customer} = require("../src/customer");
const {Item} = require("../src/item");
const {Order} = require("../src/order");
const {PaymentMethod} = require("../src/paymentMethod");

describe('Order tests', function() {
    var order;

    var validAddress = new Address();
    var cart = new Cart();
    var customer = new Customer();
    var item = new Item();
    var paymentMethod = new PaymentMethod();

    beforeEach(function() {
        validAddress.setAddressLine1("123 Main St.");
        validAddress.setAddressLine2("Apt. 5");
        validAddress.setZipCode("10028");
        validAddress.setCity("New York");
        validAddress.setState("New York");
        validAddress.setCountry("United States");
        validAddress.setFirstName("James");
        validAddress.setLastName("Bond");
        validAddress.setPhoneNumber("212-123-4567");

        customer.setCart(cart);
        customer.setId(123);
        customer.setName("James Bond"); 

        paymentMethod.setExpiration(5, 3000);
        paymentMethod.setNameOnCard("James Bond");
        paymentMethod.setNumber(7);
        paymentMethod.setSecurityCode(7);
        order = new Order();
    }); 

    it('test valid billing address modification', function() {
        order.setBillingAddress(validAddress);
        assert.equal(order.getBillingAddress(), validAddress);
    });

    it('test invalid billing address does not modify', function() {
        order.setBillingAddress(new Address());
        assert.isNull(order.getBillingAddress());
    });

    it('test valid customer modification', function() {
        order.setCustomer(customer);
        assert.equal(order.getCustomer(), customer);
    });

    it('test order id modification', function() {
        order.setId("0xFFFF");
        assert.equal(order.getId(), "0xFFFF");
    });

    it('test valid shipping address modification', function() {
        order.setShippingAddress(validAddress);
        assert.equal(order.getShippingAddress(), validAddress);
    });

    it('test invalid shipping address does not modify', function() {
        order.setShippingAddress(new Address());
        assert.isNull(order.getShippingAddress());
    });

    it('test valid payment method modification', function() {
        order.setPaymentMethod(paymentMethod);
        assert.equal(order.getPaymentMethod(), paymentMethod);
    });

    it('test invalid payment method does not modify', function() {
        order.setPaymentMethod(new PaymentMethod());
        assert.isNull(order.getPaymentMethod());
    });

    it('test order with no attributes defined is invalid', function() {
        assert.isFalse(order.isValid());
    });

    it('test order with attributes and non-empty cart is valid', function() {
        // make cart non-empty
        item.setCost(5);
        item.setId("1");
        item.setLink("amazon.com/item");
        item.setName("avocado");
        cart.addItem(item);

        order.setBillingAddress(validAddress);
        order.setShippingAddress(validAddress);
        order.setId(123);
        order.setCustomer(customer);
        order.setPaymentMethod(paymentMethod);
        assert.isTrue(order.isValid());
    });
});