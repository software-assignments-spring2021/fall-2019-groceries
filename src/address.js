class Address {
    /*
        "first_name": "Tim",
        "last_name": "Beaver",
        "address_line1": "77 Massachusetts Avenue",
        "address_line2": "",
        "zip_code": "02139",
        "city": "Cambridge",
        "state": "MA",
        "country": "US",
        "phone_number": "5551230101"
    */

    constructor() {
        this.addressLine1 = null;
        this.addressLine2 = null;
        this.zipCode = null;       
        this.city = null;
        this.state = null; 
        this.country = null;

        this.firstName = null;
        this.lastName = null;
        this.phoneNumber = null;       
    }

    getAddressLine1() {
        return this.addressLine1;
    }

    setAddressLine1(addressLine1) {
        this.addressLine1 = addressLine1;
    }

    getAddressLine2() {
        return this.addressLine2;
    }

    setAddressLine2(addressLine2) {
        this.addressLine2 = addressLine2;
    }

    getZipCode() {
        return this.zipCode;
    }

    setZipCode(zipCode) {
        this.zipCode = zipCode;
    }

    getCity() {
        return this.city;
    }

    setCity(city) {
        this.city = city;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getCountry() {
        return this.country;
    }

    setCountry(country) {
        this.country = country;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    isValid() {
        return addressLine1 !== null && 
               addressLine2 !== null &&
               zipCode !== null &&
               city !== null &&
               state !== null &&
               country !== null &&
               firstName !== null &&
               lastName !== null &&
               phoneNumber;
    }
}

module.exports = {
    Address
};