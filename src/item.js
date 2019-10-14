class Item {
    constructor() {
    	this.cost = null;
        this.id = null;
    	this.link = null;
        this.name = null;
    }

    getCost() {
    	return this.cost;
    }

    setCost(cost) {
        if (cost < 0) {
            return;
        }

    	this.cost = cost;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
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