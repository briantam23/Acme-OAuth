const conn = require('../conn');


const User = conn.define('user', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    githubUserId: {
        type: conn.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})


module.exports = User;