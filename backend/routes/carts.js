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


router.route('/:username/showcart').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:username/addItem').post((req, res) => {
    
    Cart.find({username: req.body.username})
    
    .updateOne({$push: {alias_list: req.body.item}}) // pushes item to list
    .updateOne({$inc: {num_items: 1}}) // increase num_items by 1, might need to be changed
    
    .then(cart => {
        //res.json(cart.alias_list);
        res.json(cart);
        
    })
    
    .catch(err => res.status(400).json('Error '+ err));
    
});



module.exports = router;