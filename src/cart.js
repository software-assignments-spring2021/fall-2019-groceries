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
            const itemQuantity = cartItem.getQuantity();
            const itemCost = cartItem.getItem().getCost();            
            cost += itemQuantity * itemCost;
        }

        return cost;
    }

    addItem(item, quantity) {
        if (!item.isValid()) {
            return;
        }

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

    getItemQuantity(item) {
        return this.items.get(item.getId()).getQuantity();
    }

    removeItem(item) {
        this.items.delete(item.getId());
    }

    removeAllItems() {
        this.items.clear();
    }

    getItems() {
        return this.items;
    }

    size() {
        return this.items.length;
    }

    toString() {
        // TODO
        return "";
    }
}

module.exports = {
    Cart
};