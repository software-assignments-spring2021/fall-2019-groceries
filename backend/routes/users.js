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
  
    const newUser = new User({username, password, full_name, address, phone_number});

    newUser.save()
        .then(() => {
        
        const num_items = 0;
        const alias_list = [];
    
        const newCart = new Cart({
            username,
            num_items,
            alias_list
        });
        
        return newCart.save()

        })
        .then(() => res.json('Cart added!'))
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;
