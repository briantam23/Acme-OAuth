const conn = require('../conn');


const Address = conn.define('address', {
    addressName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})


module.exports = Address;