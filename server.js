// Required packages/modules needed to run application
const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer');

// Instantiating express and setting up basic port config
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for express to allow additional data types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows connection to the db using credentials from .env
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Once connected to the database, uses inquirer to prompt user input
const mainMenu = [
    // Obtaining the project title
    {
        name: "mainPrompt",
        message: "What are we doing today?",
        type: "list",
        default: "none",
        choices: [
            "none",
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
            "Update Employee Managers",
            "View Employees (By Manager)",
            "View Employees (By Department)",
            "Delete Departments",
            "Delete Roles",
            "Delete Employees",
            "View Total Budget",
            "View Budget (By Department)"
        ],
        validate: userInput => {
            if (userInput) {
                return true;
            } else {
                console.log('You must select an option');
                return false;
            }
        }
    },
];

// Captures the response from the prompted question
const menu = () => {
    inquirer.prompt(mainMenu)
    .then(response => {
        // initializeDatabase(); MAY NEED LATER, NOT SURE YET
        return promptReroute(response);
    }); 
    
};
menu();

// Takes the user response, dispenses the appropriate results, then re-prompts user.
const promptReroute = (response) => {
    if (response.mainPrompt === "View All Departments") {
        db.query(`SELECT * FROM department`, function (err, results) {
            console.table(results);
            menu();
        });
    }
    else if (response.mainPrompt === "View All Roles") {
        db.query(`SELECT * FROM role`, function (err, results) {
            console.table(results);
        });
    }
    else if (response.mainPrompt === "View All Employees") {
        db.query(`SELECT * FROM employee`, function (err, results) {
            console.table(results);
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