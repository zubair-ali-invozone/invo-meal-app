const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Role;
