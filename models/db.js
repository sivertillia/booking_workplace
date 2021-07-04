const Sequelize = require("sequelize");
const sequelize = new Sequelize("team1_api", "postgres", "toor", {
  dialect: "postgres",
  host: "127.0.0.1",
  port: 5432,
});

module.exports = sequelize