const Router = require('express').Router();
const { User, Address } = require('../db').models;


Router.get('/', (req, res, next) => {
    User.findOne({ include: Address })
        .then(user => res.send(user))
        .catch(next)
})


module.exports = Router;