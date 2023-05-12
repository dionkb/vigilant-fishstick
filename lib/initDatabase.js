// Required packages/modules needed to run application
const db = require('../config/connection');

// Initializes the db and seeds it
const initializeDatabase = () => {

    db.query(`SHOW TABLES`, function (err, results) {
        console.log(results);
    });

    // May need this later, will leave in just in case for now
    // db.query(`SOURCE ../db/schema.sql`, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(result);
    // });
    // db.query(`SOURCE ../db/seeds.sql`, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(result);
    // });
};

// Allows this function to be imported on other files
module.exports = initializeDatabase;