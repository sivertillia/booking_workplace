const Sequelize = require("sequelize");
const sequelize = new Sequelize("ddfipv984eaoeg", "vxpmyqgfmcnpei", "4eec71ec7a62803cffe70115c1fb827d56add2614064749681a4edaef48faf95", {
  dialect: "postgres",
  host: "ec2-52-86-25-51.compute-1.amazonaws.com",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
  }
}
});

module.exports = sequelize