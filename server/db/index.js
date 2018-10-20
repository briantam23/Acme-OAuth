const conn = require('./conn');
const Address = require('./models/Address');
const User = require('./models/User');


Address.belongsTo(User);
User.hasMany(Address);


const syncAndSeed = () => {
    let moe, address1, address2;
    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ name: 'Moe' })
        ]))
        .then(users => {
            [moe, larry] = users;
            return Promise.all([
                Address.create({ addressName: '123 Main Street, New York, NY 10007' }),
                Address.create({ addressName: '5 Hanover Square, New York, NY 10004' })
            ])
        })
        .then(addresses => {
            [address1, address2] = addresses;
            moe.setAddresses(address1, address2);
        })
}


module.exports = {
    models: {
        Address,
        User
    },
    syncAndSeed
}