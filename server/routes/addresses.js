const Router = require('express').Router();
const { Address } = require('../db').models;


Router.get('/', (req, res, next) => {
    Address.findAll()
        .then(addresses => res.send(addresses))
        .catch(next)
})

Router.post('/', (req, res, next) => {
    Address.create(req.body)
        .then(address => res.send(address))
        .catch(next)
})

Router.delete('/:id', (req, res, next) => {
    Address.destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = Router;