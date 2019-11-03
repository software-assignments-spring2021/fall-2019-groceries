const router = require('express').Router();
let User = require('../models/user.model');

router.route('/update/:username').post((req,res) => {
    var new_item = {"alias": req.body.alias, "link": req.body.link};
    User.find({username: req.body.username})
    .updateOne({$push: {alias_list: new_item}})
    .then(user => res.json())
    .catch(err => res.status(400).json('Error '+ err));
});

router.route('/:username').get((req, res) => {
    User.find({username: req.body.username})
    .then(user => res.json(user[0].alias_list))
    .catch(err => res.status(400).json('Error '+ err));
})

module.exports = router;