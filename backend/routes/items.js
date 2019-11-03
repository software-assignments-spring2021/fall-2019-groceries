const router = require('express').Router();
let Item = require('../models/item.model');
let User = require('../models/user.model');
let Cart = require('../models/cart.model');

router.route('/add').post((req, res) => {
    const username = req.body.username;
    var cost = req.body.cost;
    var id = req.body.id;
    var link = req.body.link;
    var name = req.body.name;

    var newItem = new Item({
        username,
        cost,
        id,
        link,
        name
    });
    return newItem.save()
    .then(item => res.json())
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:username').post((req,res) => {
    Cart.find({username: req.body.username})
    .updateOne({$push: {fullItemsInfo: req.body.itemsInfo}})
    .then(item => res.json())
    .catch(err => res.status(400).json('Error '+ err));
});

router.route('/:username').get((req, res) => {
    Cart.find({username: req.body.username})
    .then(cart => res.json(cart[0].fullItemsInfo))
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;