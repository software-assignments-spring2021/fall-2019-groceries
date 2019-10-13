const {Dict} = require("collections/dict");

class CartItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }
}

class Cart {
    constructor() {
    	this.items = new Dict();    
    }

    getSubtotal() {
        var cost = 0;

    	for (let cartItem of this.items.values()) {
            cost += cartItem.getItem().getCost();
        }

        return cost;
    }

    addItem(item, quantity) {
        const itemId = item.getId();

        if (this.items.has(itemId)) {
            const currentItemQuantity = this.items.get(itemId).getQuantity();
            this.items.get(itemId).setQuantity(currentItemQuantity + quantity);
        }
        else {
            const cartItem = new CartItem(item, quantity);
            this.items.set(itemId, cartItem);
        }
    }

    editItemQuantity(item, newQuantity) {
        this.items.get(item.getId()).setQuantity(newQuantity)
    }

    removeItem(item) {
        this.items.remove(item.getId());
    }

    removeAllItems() {
        this.items.clear();
    }

    getItems() {
        return this.items;
    }

    setItems(items) {
        this.items = items;
    }

    size() {
        return this.items.length;
    }
}

module.exports = {
    Cart
};