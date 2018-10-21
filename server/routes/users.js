const Router = require('express').Router();
const { User, Address } = require('../db').models;


Router.get('/', (req, res, next) => {
    User.findOne({ include: Address })
        .then(user => res.send(user))
        .catch(next)
})

Router.delete('/:id', (req, res, next) => {
    User.destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = Router;