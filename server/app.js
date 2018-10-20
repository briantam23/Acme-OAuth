const express = require('express');
const app = express();
const path = require('path');


app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/users', require('./routes/users'));


module.exports = app;