const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/add').post((req, res) => {
    const username = req.body.username;
    var item_list = req.body.item_list;

    var newCart = new Cart({
        username,
        item_list
    });
    return newCart.save()
    
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:username').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:username').post((req, res) => {
    var new_item = {"quantity": req.body.quantity, "item": req.body.item};
    Cart.find({username: req.body.username})

    .updateOne({$push: {item_list: new_item}}) // pushes item to list
    .then(cart => res.json())
    .catch(err => res.status(400).json('Error '+ err));
    
});

module.exports = router;