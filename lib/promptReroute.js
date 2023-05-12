// Required packages/modules needed to run application
const db = require('../config/connection');

// This takes the initial prompt input and redirects to dispense the related info
const promptReroute = (response) => {
    if (response.mainPrompt === "View All Departments") {
        db.query(`SELECT * FROM department`, function (err, results) {
            console.log(results);
        });
    }
    else if (response.mainPrompt === "View All Roles") {
        db.query(`SELECT * FROM role`, function (err, results) {
            console.log(results);
        });
    }
    else if (response.mainPrompt === "View All Employees") {
        db.query(`SELECT * FROM employee`, function (err, results) {
            console.log(results);
        });
    }
    else if (response.mainPrompt === "Add A Department") {

    }
    else if (response.mainPrompt === "Add A Role") {

    }
    else if (response.mainPrompt === "Add An Employee") {

    }
    else if (response.mainPrompt === "Update An Employee Role") {

    }
    else if (response.mainPrompt === "Update Employee Managers") {

    }
    else if (response.mainPrompt === "View Employees (By Manager)") {

    }
    else if (response.mainPrompt === "View Employees (By Department)") {

    }
    else if (response.mainPrompt === "Delete Departments") {

    }
    else if (response.mainPrompt === "Delete Roles") {

    }
    else if (response.mainPrompt === "Delete Employees") {

    }
    else if (response.mainPrompt === "View Total Budget") {

    }
    else if (response.mainPrompt === "View Budget (By Department)") {

    }
    else {
        console.log(err);
    }
};

// Allows this function to be imported on other files
module.exports = promptReroute;