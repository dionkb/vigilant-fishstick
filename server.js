// Required packages/modules needed to run application
const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');

// Setting up possible path to model so I dont forget to use this if I find I need it
// const modelIfNeeded = require('./models/modelIfNeeded');

// Instantiating express and setting up basic port config
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for express to allow additional data types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows seqelize to connect to the db before starting the server to ensure it loads
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
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
    return inquirer.prompt(mainMenu);
};

// Initializes the prompts, then uses the response to send related data to user
init()
.then(response => {
    // Used for testing purposes, will delete when no longer needed
    console.log(response);
    if (response.mainPrompt === "View All Departments") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View All Roles") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View All Employees") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add A Department") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add A Role") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add An Employee") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Update An Employee Role") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Update Employee Managers") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Employees (By Manager)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Employees (By Department)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Departments") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Roles") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Employees") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Total Budget") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Budget (By Department)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else {
        console.log(err);
    }
});
