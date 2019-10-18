const assert = require('chai').assert;
const {Address} = require("../src/address");
const {Cart} = require("../src/cart");
const {Customer} = require("../src/customer");
const {Item} = require("../src/item");
const {Order} = require("../src/order");

describe('Order tests', function() {
    var order;

    var validAddress = new Address();
    var cart = new Cart();
    var customer = new Customer();
    var item = new Item();

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

    it('test customer modification', function() {
        order.setCustomer(customer);
        assert.equal(order.getCustomer(), customer);
    });

    it('test order id modification', function() {
        order.setId("0xFFFF");
        assert.equal(order.getId(), "0xFFFF");
    });

    it('test shipping validAddress modification', function() {
        order.setShippingAddress(validAddress);
        assert.equal(order.getShippingAddress(), validAddress);
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
        assert.isTrue(order.isValid());
    });
});