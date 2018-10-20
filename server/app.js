const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jwt-simple');
const ejs = require('ejs');
const { User } = require('./db').models;


try{
    Object.assign(process.env, require('../.env'));
}
catch(ex) { console.log(ex) };

app.engine('html', ejs.renderFile);
app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../public/index.html'), { token: req.query.token });
});

app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message });
})


module.exports = app;