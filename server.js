// Required packages/modules needed to run application
const express = require('express');
// const db = require('./config/connection'); MAY NOT NEED HERE
const inquirer = require('inquirer');
// const initializeDatabase = require('./lib/initDatabase'); MAY NOT NEED AGAIN
const promptReroute = require('./lib/promptReroute');

// Setting up possible path to model so I dont forget to use this if I find I need it
// const modelIfNeeded = require('./models/modelIfNeeded');

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
function init() {
    inquirer.prompt(mainMenu)
    .then(response => {
        // initializeDatabase(); MAY NEED LATER, NOT SURE YET
        return promptReroute(response);
    });    
};

// Initializes the prompts, then uses the response to send related data to user
init()