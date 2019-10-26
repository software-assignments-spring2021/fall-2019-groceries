const assert = require('chai').assert;
const {Address} = require("../src/address");

describe('Address tests', function() {

	var address;

	beforeEach(function() {
	 	address = new Address();
	});	

	it('test address line 1 modification', function() {
		address.setAddressLine1("123 Main St.");
		assert.equal(address.getAddressLine1(), "123 Main St.");
	});

	it('test address line 2 modification', function() {
		address.setAddressLine2("Apt. 5");
		assert.equal(address.getAddressLine2(), "Apt. 5");
	});

	it('test zip code modification', function() {
		address.setZipCode(10028);
		assert.equal(address.getZipCode(), 10028);
	});

	it('test city modification', function() {
		address.setCity("New York");
		assert.equal(address.getCity(), "New York");
	});

	it('test state modification', function() {
		address.setState("New York");
		assert.equal(address.getState(), "New York");
	});

	it('test country modification', function() {
		address.setCountry("United States");
		assert.equal(address.getCountry(), "United States");
	});

	it('test first name modification', function() {
		address.setFirstName("James");
		assert.equal(address.getFirstName(), "James");
	});

	it('test last name modification', function() {
		address.setLastName("Bond");
		assert.equal(address.getLastName(), "Bond");
	});

	it('test phone number modification', function() {
		address.setPhoneNumber("212-123-4567");
		assert.equal(address.getPhoneNumber(), "212-123-4567");
	});

	it('test address with no attributes defined is invalid', function() {
		assert.isFalse(address.isValid());
	});

	it('test address with all attributes defined is valid', function() {
		address.setAddressLine1("123 Main St.");
		address.setAddressLine2("Apt. 5");
		address.setZipCode("10028");
		address.setCity("New York");
		address.setState("New York");
		address.setCountry("United States");
		address.setFirstName("James");
		address.setLastName("Bond");
		address.setPhoneNumber("212-123-4567");
		assert.isTrue(address.isValid());
	});
});