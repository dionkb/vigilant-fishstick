// Instantiation sequelize and allowing the dotenv package to run
const Sequelize = require('sequelize');
require('dotenv').config();

// Allows you to run secure info remotely, and not hardcoded in a public space
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

// Allows this config to be imported elsewhere
module.exports = sequelize;
