const Sequelize = require("sequelize");

const {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_CONNECTION,
  host: DB_HOST,
  port: DB_PORT,
});

module.exports = sequelize;
