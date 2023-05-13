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
        choices: [
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
            "View Budget (By Department)",
            "Quit"
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
                inquirer.prompt([
                    {
                        name: "deptName",
                        message: "Enter the name of the department you would like to add:",
                        type: "input",
                    }
                ])
                .then(answer => {
                    db.query(`INSERT INTO department (name) VALUES ("${answer.deptName}")`, function (err, results) {
                        console.log("Successfully added " + answer.deptName + " department")
                    })
                    menu();
                });
                break;
            case "Add A Role":
                inquirer.prompt([
                    {
                        name: "roleTitle",
                        message: "Enter the title of the role you would like to add:",
                        type: "input",
                    },
                    {
                        name: "roleSalary",
                        message: "Enter the salary of the role you are adding (Example: 50000):",
                        type: "input",
                    },
                    {
                        name: "roleDeptID",
                        message: "Enter the department id# that this role will be associated with (Example: 7):",
                        type: "input",
                    }
                ])
                .then(answer => {
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", ${answer.roleSalary}, ${answer.roleDeptID})`, function (err, results) {
                        console.log("Successfully added " + answer.roleTitle + " role")
                    })
                    menu();
                });
                break;
            case "Add An Employee":
                inquirer.prompt([
                    {
                        name: "firstName",
                        message: "Enter the employee's first name:",
                        type: "input",
                    },
                    {
                        name: "lastName",
                        message: "Enter the employee's last name:",
                        type: "input",
                    },
                    {
                        name: "roleID",
                        message: "Enter the role id# that this employee will be associated with (Example: 2):",
                        type: "input",
                    },
                    {
                        name: "mngrID",
                        message: "Enter the id# for the manager that this employee will work under (Example: 1):",
                        type: "input",
                        default: "null",
                    }
                ])
                .then(answer => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.roleID}, ${answer.mngrID})`, function (err, results) {
                        console.log("Successfully added " + answer.firstName + " " + answer.lastName + " as a new employee")
                    })
                    menu();
                });
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
            case "Quit":
                console.log("Goodbye!");
                db.end();
                break;
        }
    }); 
    
};
menu();