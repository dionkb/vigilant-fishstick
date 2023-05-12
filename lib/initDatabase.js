// Required packages/modules needed to run application
const sequelize = require('../config/connection');

// FIXME: ATTEMPTIN TO RUN SQL SOURCES LIKE THIS, DONT THINK IT CAN WORK THIS WAY
const initializeDatabase = () => {
    // Initializes the db and seeds it
    sequelize.query(`SOURCE ../db/schema.sql`, function (err, result) {
        console.log(result);
    });
    sequelize.query(`SOURCE ../db/seeds.sql`, function (err, result) {
        console.log(result);
    });
};

// Allows this function to be imported on other files
module.exports = initializeDatabase;