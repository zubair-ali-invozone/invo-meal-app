const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CancelMeal = sequelize.define("cancelMeal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subscriptionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reason: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  }
}, {
  freezeTableName: true
});

module.exports = CancelMeal;
