const Sequelize = require("sequelize");
const sequelize = require('./db');

const Workplaces = sequelize.define("workplaces", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    place_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    x: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Workplaces;
// Create TABLE
// sequelize.sync({force: true}).then(result=>{console.log(result);}).catch(err=> console.log(err)); 
