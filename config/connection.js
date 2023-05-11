const Sequelize = require('sequelize');
require('dotenv').config();

// Allows it to connect to the .env file in the root, pulling info from there.
// This allows you to store passwords separately, and not hardcoded where others can read it freely.
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

module.exports = sequelize;
