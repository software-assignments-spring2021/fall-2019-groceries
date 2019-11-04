const router = require('express').Router();
let User = require('../models/user.model');

router.route('/update/:username').post((req,res) => {
    User.find({username: req.params.username})
    .updateOne({$set: {aliases: req.params.aliases}})
    .then(user => res.json())
    .catch(err => res.status(400).json('Error '+ err));
});

router.route('/:username').get((req, res) => {
    User.find({username: req.params.username})
    .then(user => res.json(user[0].aliases))
    .catch(err => res.status(400).json('Error '+ err));
})

module.exports = router;
