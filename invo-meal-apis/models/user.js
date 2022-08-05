const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../utils/database");
const Role = require("./role");
const Designation = require("./designation");

const saltRounds = 10;

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  designationId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.beforeCreate((user) => {
  const hashPassword = bcrypt.hashSync(user.password, saltRounds);
  user.password = hashPassword;
});

User.hasOne(Role, { sourceKey: "roleId", foreignKey: "id" });

User.hasOne(Designation, { sourceKey: "designationId", foreignKey: "id" });

module.exports = User;
