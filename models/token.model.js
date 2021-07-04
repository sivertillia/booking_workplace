const Sequelize = require("sequelize");
const sequelize = require('./db');

const Token = sequelize.define("token", {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Token;
// Create TABLE
// sequelize.sync({force: true}).then(result=>{console.log(result);}).catch(err=> console.log(err));
