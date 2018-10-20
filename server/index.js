const { syncAndSeed } = require('./db');
const PORT = process.env.PORT || 8080;


require('./app').listen(PORT, () => console.log(`

    Listening on PORT ${PORT}!
    http://localhost:${PORT}/


`))

syncAndSeed();