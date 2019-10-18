class PaymentMethod {
    /*
        "name_on_card": "Ben Bitdiddle",
        "number": "5555555555554444",
        "security_code": "123",
        "expiration_month": 1,
        "expiration_year": 2020,
        "use_gift": false
    */

    constructor() {
        this.expirationMonth = null;
        this.expirationYear = null;
        this.nameOnCard = null;
        this.number = null;
        this.securityCode = null;
        this.useGift = false;    
    }

    getExpirationMonth() {
        return this.expirationMonth;
    }

    getExpirationYear() {
        return this.expirationYear;
    }

    setExpiration(expirationMonth, expirationYear) {
        const isValidMonthNumber = expirationMonth >= 1 && 
                                   expirationMonth <= 12;

        if (!isValidMonthNumber) {
            return;
        }

        const dateNow = new Date();
        const monthNow = dateNow.getMonth();
        const yearNow = dateNow.getFullYear();

        const isCardExpired = expirationYear < yearNow ||
                              (yearNow == expirationYear && 
                               expirationMonth < monthNow);

        if (isCardExpired) {
            return;
        }

        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
    }

    getNameOnCard() {
        return this.nameOnCard;
    }

    setNameOnCard(nameOnCard) {
        this.nameOnCard = nameOnCard;
    }

    getNumber() {
        return this.number;
    }

    setNumber(number) {
        this.number = number;
    }

    getSecurityCode() {
        return this.securityCode;
    }

    setSecurityCode(securityCode) {
        this.securityCode = securityCode;
    }

    isValid() {
        return this.expirationMonth !== null &&
               this.expirationYear !== null &&
               this.nameOnCard !== null &&
               this.number !== null &&
               this.securityCode !== null;
    }
}

module.exports = {
    PaymentMethod
};