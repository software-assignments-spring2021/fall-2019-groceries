const router = require('express').Router();
let User = require('../models/user.model');
let Cart = require('../models/cart.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const full_name = req.body.full_name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;    
    var aliases = [];
    
    const newUser = new User({username, password, full_name, address, phone_number, aliases});

    newUser.save()
        .then(() => {
        
        const newCart = new Cart({username});
        res.json(newCart)
        return newCart.save()
        })
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:username').get((req, res) => {
    User.find({username: req.body.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error '+ err));
})


module.exports = router;
