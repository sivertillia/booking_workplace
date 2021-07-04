const Sequelize = require("sequelize");
const sequelize = require('./db');

const Reservation = sequelize.define("reservations", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    place_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY(),
        allowNull: false
    },
    time_from: {
        type: Sequelize.TIME,
        allowNull: false
    },
    time_to: {
        type: Sequelize.TIME,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Reservation;
// Create TABLE
// sequelize.sync({force: true}).then(result=>{console.log(result);}).catch(err=> console.log(err)); 
