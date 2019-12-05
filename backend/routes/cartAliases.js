const router = require('express').Router();
let User = require('../models/user.model');

router.route('/update/:username').post((req,res) => {
    User.find({username: req.params.username})
    .updateOne({$set: {cartAliases: req.body.cartAliases}})
    .then(user => res.json())
    .catch(err => res.status(400).json('Error '+ err));
});

router.route('/:username').get((req, res) => {
    User.find({username: req.params.username})
    .then(user => res.json(user[0].cartAliases))
    .catch(err => res.status(400).json('Error '+ err));
})

module.exports = router;