const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then(carts => res.json(carts))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    var alias_list = req.body.alias_list;
    var num_items = alias_list.length;

    var newCart = new Cart({
        username,
        num_items,
        alias_list
    });

    return newCart.save()
    .then(() => res.json('Cart added!'))
    .catch(err => res.status(400).json('Error: '+err));
});


router.route('/:username/showCart').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:username/addItem').post((req, res) => {
    
    Cart.find({username: req.body.username})
    .updateOne({$push: {alias_list: req.body.item}})
    .updateOne({$set: {num_items: Cart.alias_list.length()}})
    //.updateOne({$push: {num_items: req.length}})
    .then(cart => {
        //Cart.updateOne({$push: {alias_list: req.body.item}})
        
        
        //return cart.save();
        res.json(cart);
        //cart.save()
    })
    
    .catch(err => res.status(400).json('Error '+ err));
    
    //cart.alias_list.push(req.body.alias_list);
    
    //cart.alias_list.push(req.body.add_item)
    /*
    .then({

        cart.alias_list.append(req.body.alias_list);

        cart.save()
        .then(() => res.json('Cart updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    */
    //.then(() => res.json('Cart updated!'))
    //.catch(err => res.status(400).json('Error '+ err));
});


module.exports = router;