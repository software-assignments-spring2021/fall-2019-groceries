const assert = require('chai').assert;

const productOrder = require("../productOrder.js");

const {Address} = require("../../src/address");
const {Cart} = require("../../src/cart");
const {CartItem} = require("../../src/cart");
const {Customer} = require("../../src/customer");
const {Item} = require("../../src/item");
const {Order} = require("../../src/order");
const {PaymentMethod} = require("../../src/paymentMethod");

describe('Product ordering tests', function() {

    var order;
    var rid;

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
        validAddress.setCountry("US");
        validAddress.setFirstName("James");
        validAddress.setLastName("Bond");
        validAddress.setPhoneNumber("212-123-4567");

        customer.setUsername("timbeaver@gmail.com");
        customer.setPassword("myRetailerPassword");

        cart = new Cart();

        var item1 = new Item();
        item1.setId("B07XR5TRSZ");
        item1.setName("Apple Watch");
        

        var item2 = new Item();
        item2.setId("B07RSSPBGJ");
        item2.setName("Banana");

        var item3 = new Item();
        item3.setId("BB07FZ8S74R");
        item3.setName("Echo");
        
        cart.addItem(item1,1);
        cart.addItem(item2,2);
        cart.addItem(item3,1);

        customer.setCart(cart);
        customer.setId(123);
        customer.setName("James Bond"); 

        paymentMethod.setExpiration(5, 2020);
        paymentMethod.setNameOnCard("James Bond");
        paymentMethod.setNumber(5555555555554444);
        paymentMethod.setSecurityCode(123);
        order = new Order();

        order.setBillingAddress(validAddress);
        
        order.setCustomer(customer);
        order.setShippingAddress(validAddress);
        order.setIsGift(false);
        order.setMaxPrice(1);
        order.setPaymentMethod(paymentMethod);

    }); 

    it('Checking if billing is not empty', function() {

        
        assert.isNotEmpty(order.getBillingAddress());


    });

    it('Checking if payment method is not empty', function() {

        assert.isNotEmpty(order.getPaymentMethod());


    });

    it('Checking if customer is not empty', function() {

        assert.isNotEmpty(order.getCustomer());


    });


    it('Checking if the ordering works', function() {

        rid = productOrder.orderItem(order);

        
        assert.isNotNull(rid);
        

    });

    it('Checking if the get order request works', function() {

        var output = productOrder.getOrderRequest(rid);
        
        assert.isNotNull(output);
      
    });

});