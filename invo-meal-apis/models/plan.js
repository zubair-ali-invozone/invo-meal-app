const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Plans = sequelize.define("plans", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  planType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  planTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  planDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Plans;
