const Address = require('./models/Address');
const User = require('./models/User');


Address.belongsTo(User);
User.hasMany(Address);


module.exports = {
    models: {
        Address,
        User
    }
}