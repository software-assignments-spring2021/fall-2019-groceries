const router = require('express').Router();
let Alias = require('../models/alias.model');

router.route('/').get((req, res) => {
    Alias.find()
        .then(aliases => res.json(aliases))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const alias = req.body.alias;
    const link = req.body.link;

    const newAlias = new Alias({
        username,
        alias,
        link
    });

    newAlias.save()
    .then(() => res.json('Alias added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
    Alias.findByID(req.params.id)
    .then(alias => res.json(alias))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Cart.findByIDandDelete(req.params.id)
    .then(cart => res.json('Cart deleted.'))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Cart.findByID(req.params.id)
    .then(cart => {
        cart.username = req.body.username;
        cart.num_items = Number(req.body.num_items);
        cart.alias_list = Array(req.body.alias_list);

        cart.save()
        .then(() => res.json('Cart updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error '+ err));
});


module.exports = router;