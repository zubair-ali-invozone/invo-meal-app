const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const CancelMeal = require("./cancelMeal");
const User = require("./user");
const Plans = require("./plan");

const Subscription = sequelize.define("subscriptions", {
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
  expDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Subscription.hasOne(CancelMeal, { sourceKey: "id", foreignKey: "subscriptionId" });

Subscription.hasOne(User, { sourceKey: "userId", foreignKey: "id" });

User.hasOne(Subscription, { sourceKey: "id", foreignKey: "userId" });

Subscription.hasOne(Plans, { sourceKey: "planId", foreignKey: "id" });

module.exports = Subscription;
