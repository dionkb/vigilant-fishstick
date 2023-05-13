// Import mysql2 and allow dotenv package to run config with .env credentials
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Allows you to run secure info remotely, and not hardcoded in a public space
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the ` + process.env.DB_NAME + ` database.`)
);

// Allows this config to be imported elsewhere
module.exports = db;
