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
        default: "Update An Employee Role",
    },
];

// Takes the user response, dispenses the appropriate results, then re-prompts user.
const menu = () => {
    inquirer.prompt(mainMenu)
    .then(userInput => {
        let response = userInput.mainPrompt;
        switch(response) {
            // Each case (self-explanatory titles) provides the relevant information using the related functions found further below 
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Update An Employee Role":
                updateEmpRole();    
                break;
            case "Update Employee Managers":
                updateEmpMngr();
                break;

                // OPTIONAL BONUS POINTS!
            // case "View Employees (By Manager)":

            //     break;
            // case "View Employees (By Department)":

            //     break;
            // case "Delete Departments":

            //     break;
            // case "Delete Roles":

            //     break;
            // case "Delete Employees":

            //     break;
            // case "View Total Budget":

            //     break;
            // case "View Budget (By Department)":

            //     break;


            case "Quit":
                console.log("Goodbye!");
                db.end();
                break;
        }
    }); 
    
};
menu();


// --------------------------------------------------------------------------//
//   BELOW ARE THE FUNCTIONS THAT ALLOW THE SWITCH CASES TO ROUTE THE USER   //
// --------------------------------------------------------------------------//

function viewDepartments() {
    db.query(`SELECT id, name FROM department ORDER BY name ASC;`, function (err, results) {
        if (err) throw (err);
        console.table(results);
        menu();  
    });
};

function viewRoles() {
    db.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY department;`, function (err, results) {
        if (err) throw (err);
        console.table(results);
        menu();
    });
};


function viewEmployees() {
    db.query(`SELECT E.id, E.first_name, E.last_name, CONCAT(M.first_name, ' ', M.last_name) AS manager, R.title, R.salary FROM employee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.id ORDER BY last_name;`, function (err, results) {
        if (err) throw (err);
        console.table(results);
        menu();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            message: "Enter the name of the department you would like to add:",
            type: "input",
        }
    ])
    .then(answer => {
        db.query(`INSERT INTO department (name) VALUES ("${answer.deptName}")`, function (err) {
            if (err) throw (err);
            console.log("Successfully added " + answer.deptName + " department");
        })
        menu();
    });
};

function addRole() {
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
        //FIXME: find a way to list off the departments instead of making user blind guess the dept.#
        {
            name: "roleDeptID",
            message: "Enter the department id# that this role will be associated with (Example: 7):",
            type: "input",
        }
    ])
    .then(answer => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", ${answer.roleSalary}, ${answer.roleDeptID})`, function (err) {
            if (err) throw (err);
            console.log("Successfully added " + answer.roleTitle + " role")
        })
        menu();
    });
};

function addEmployee() {
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
        //FIXME: find a way to list off the role/managers instead of choosing number blind
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
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.roleID}, ${answer.mngrID})`, function (err) {
            if (err) throw (err);
            console.log("Successfully added " + answer.firstName + " " + answer.lastName + " as a new employee")
        })
        menu();
    });
};

function updateEmpRole() {
    const getEmpList = () => {
        db.query(`SELECT id AS value, first_name AS name FROM employee;`, function (err, results) {
            if (err) throw (err);
            inquirer.prompt([
                {
                    name: "selectEmployee",
                    message: "Which employee's role are you updating?",
                    type: "list",
                    choices: results,
                },
                //FIXME: find a way to list instead of blind number
                {
                    name: "updatedRole",
                    message: "What is this employees new role?",
                    type: "input",
                }
            ])
            .then(answers => {
                db.query(`UPDATE employee SET role_id = '${answers.updatedRole}' WHERE id = '${answers.selectEmployee}'`, function (err) {
                    if (err) throw (err);
                    console.log("Successfully updated " + answers.selectEmployee + "'s role to " + answers.updatedRole);
                })
                menu();
            });
        });
    }
    getEmpList();
};

function updateEmpMngr() {
    const getEmpList = () => {
        db.query(`SELECT id AS value, first_name AS name FROM employee;`, function (err, results) {
            if (err) throw (err);
            inquirer.prompt([
                {
                    name: "selectEmployee",
                    message: "Which employee's manager are you updating?",
                    type: "list",
                    choices: results,
                },
                //FIXME: find a way to list instead of blind number
                {
                    name: "updatedMngr",
                    message: "Who is this employees new manager?",
                    type: "input",
                }
            ])
            .then(answers => {
                db.query(`UPDATE employee SET manager_id = '${answers.updatedMngr}' WHERE id = '${answers.selectEmployee}'`, function (err) {
                    if (err) throw (err);
                    console.log("Successfully updated " + answers.selectEmployee + "'s manager to " + answers.updatedMngr);
                })
                menu();
            });
        });
    }
    getEmpList();
};