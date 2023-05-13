// Required packages/modules needed to run application
const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    },
];

// Takes the user response, dispenses the appropriate results, then re-prompts user.
const menu = () => {
    inquirer.prompt(mainMenu)
    .then(userInput => {
        let response = userInput.mainPrompt;
        switch(response) {
            // Each case (self-explanatory titles) provides the relevant information
            case "View All Departments":
                db.query(`SELECT * FROM department`, function (err, results) {
                    console.table(results);
                    menu();  
                });
                break;
            case "View All Roles":
                db.query(`SELECT * FROM role`, function (err, results) {
                    console.table(results);
                    menu();
                });
                break;
            case "View All Employees":
                db.query(`SELECT * FROM employee`, function (err, results) {
                    console.table(results);
                    menu();
                });
                break;
            case "Add A Department":

                break;
            case "Add A Role":

                break;
            case "Add An Employee":

                break;
            case "Update An Employee Role":

                break;
            case "Update Employee Managers":

                break;
            case "View Employees (By Manager)":

                break;
            case "View Employees (By Department)":

                break;
            case "Delete Departments":

                break;
            case "Delete Roles":

                break;
            case "Delete Employees":

                break;
            case "View Total Budget":

                break;
            case "View Budget (By Department)":

                break;
        }
    }); 
    
};
menu();