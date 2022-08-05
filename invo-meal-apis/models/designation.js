const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Designation = sequelize.define("designations", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Designation;
