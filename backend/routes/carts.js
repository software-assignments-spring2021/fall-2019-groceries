const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/add').post((req, res) => {
    const username = req.body.username;
    var items = req.body.items;

    var newCart = new Cart({
        username,
        items
    });
    return newCart.save()
    
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:username').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => res.json(cart[0].items))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:username').post((req, res) => {
    Cart.find({username: req.body.username})
    .updateOne({$push: {items: req.body.items}}) // pushes items to items list
    .then(cart => res.json())
    .catch(err => res.status(400).json('Error '+ err));
    
});

module.exports = router;