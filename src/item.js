class Item {
    constructor() {
    	this.cost = null;
    	this.link = null;
        this.name = null;       
    }

    getCost() {
    	return this.cost;
    }

    setCost(cost) {
    	this.cost = cost;
    }

    getLink() {
    	return this.link;
    }

    setLink(link) {
    	this.link = link;
    }

    getName() {
    	return this.name;
    }

    setName(name) {
    	this.name = name;
    }
}

module.exports = {
    Item
};