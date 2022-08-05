const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const User = require("./user");
const Plans = require("./plan");
const Subscription = require("./subscription");

const Invoices = sequelize.define("invoices", {
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
  planId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subscriptionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  isPaid: {
    type: Sequelize.TINYINT,
    allowNull: false,
  },
  proofImage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Invoices.hasOne(Plans, { sourceKey: "planId", foreignKey: "id" });

Invoices.hasOne(User, { sourceKey: "userId", foreignKey: "id" });

Invoices.hasOne(Subscription, { sourceKey: "subscriptionId", foreignKey: "id" });

module.exports = Invoices;
