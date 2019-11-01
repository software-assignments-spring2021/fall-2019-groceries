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

router.route('/:username/updateList').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => 
        res.json(cart.keys)
        //cart.save()
    )
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