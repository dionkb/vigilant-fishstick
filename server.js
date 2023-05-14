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

            // THE FOLLWOING WILL BE IMPLEMENTED IN FUTURE UPDATES
            "Update Employee Manager",
            // "View Employees (By Manager)",
            // "View Employees (By Department)",
            "Delete Departments",
            "Delete Roles",
            "Delete Employees",
            // "View Total Budget",
            // "View Budget (By Department)",

            "Quit"
        ],
        default: "View All Departments",
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

            // OPTIONAL BONUS POINTS FOR FUTURE UPDATES!
            case "Update Employee Manager":
                updateEmpMngr();
                break;
            // case "View Employees (By Manager)":
            //     viewEmpByMngr();
            //     break;
            // case "View Employees (By Department)":
            //     viewEmpByDpt();
            //     break;
            case "Delete Departments":
                deleteDepartment();
                break;
            case "Delete Roles":
                deleteRole();
                break;
            case "Delete Employees":
                deleteEmployee();
                break;
            // case "View Total Budget":
            //     viewTotalBudget();
            //     break;
            // case "View Budget (By Department)":
            //     viewBudgetByDept();
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
    db.query(`SELECT role.id, role.title AS "job title", role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY department;`, function (err, results) {
        if (err) throw (err);
        console.table(results);
        menu();
    });
};


function viewEmployees() {
    db.query(`SELECT E.id, E.first_name AS "first name", E.last_name AS "last name", CONCAT(M.first_name, ' ', M.last_name) AS manager, R.title AS "job title", R.salary, D.name AS department FROM employee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.id LEFT JOIN department D ON R.department_id = D.id ORDER BY E.last_name;`, function (err, results) {
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
    const getDeptList = () => {
        db.query(`SELECT id AS value, name FROM department;`, function (err, results) {
            if (err) throw (err);
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
                    message: "Select the department that this role will be associated with:",
                    type: "list",
                    choices: results,
                }
            ])
            .then(answer => {
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", ${answer.roleSalary}, ${answer.roleDeptID})`, function (err) {
                    if (err) throw (err);
                    console.log("Successfully added " + answer.roleTitle + " role")
                })
                menu();
            });
        });
    }
    getDeptList();
};

function addEmployee() {
    const getRoleList = () => {
        db.query(`SELECT id AS value, title AS name FROM role;`, function (err, results) {
            if (err) throw (err);
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
                    message: "Select the role that this employee will be associated with:",
                    type: "list",
                    choices: results,
                }
            ])
            .then(answer => {
                let answerBank = answer;
                const getMngrList = () => {
                    db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`, function (err, results) {
                        if (err) throw (err);
                        results.push({ value: 0, name: "null" });
                        inquirer.prompt([
                            {
                                name: "mngrID",
                                message: "Select the manager that this employee will work under:",
                                type: "list",
                                default: "null",
                                choices: results
                            }
                        ])
                        .then(answer => {
                            db.query(`INSERT INTO employee (first_name, Last_name, role_id, manager_id) VALUES ("${answerBank.firstName}", "${answerBank.lastName}", ${answerBank.roleID}, ${answer.mngrID})`, function (err) {
                                if (err) throw (err);
                                console.log("Successfully added " + answerBank.firstName + " " + answerBank.lastName + " as an employee");
                            });
                            menu();        
                        });
                    });
                };
                getMngrList();
            });
        });
    };
    getRoleList();
};

function updateEmpRole() {
    const getEmpList = () => {
        db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`, function (err, results) {
            if (err) throw (err);
            inquirer.prompt([
                {
                    name: "selectEmployee",
                    message: "Which employee's role are you updating?",
                    type: "list",
                    choices: results,
                },
            ])
            .then(answer => {
                let answerBank = answer;
                const getRoleList2 = () => {  
                    db.query(`SELECT id AS value, title AS name FROM role;`, function (err, results) {
                        if (err) throw (err);
                        inquirer.prompt([              
                            {
                                name: "updatedRole",
                                message: "What is this employees new role?",
                                type: "list",
                                choices: results,
                            }
                        ])
                        .then(answer => {
                            db.query(`UPDATE employee SET role_id = "${answer.updatedRole}" WHERE id = "${answerBank.selectEmployee}"`, function (err) {
                                if (err) throw (err);
                                console.log("Successfully updated role");
                            });
                            menu(); 
                        });
                    });
                };
                getRoleList2();
            });
        });
    };
    getEmpList();
};

// --------------------------------------------------------------------------------//
//   BELOW ARE THE BONUS FUNCTIONS THAT ALLOW THE SWITCH CASES TO ROUTE THE USER   //
// --------------------------------------------------------------------------------//

function updateEmpMngr() {
    const getEmpList2 = () => {
        db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`, function (err, results) {
            if (err) throw (err);
            inquirer.prompt([
                {
                    name: "selectEmployee",
                    message: "Which employee's manager are you updating?",
                    type: "list",
                    choices: results,
                },
            ])
            .then(answer => {
                let answerBank = answer;
                const getMngrList2 = () => {
                    db.query(`SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee;`, function (err, results) {
                        if (err) throw (err);
                        results.push({ value: 0, name: "null" });
                        inquirer.prompt([
                            {
                                name: "mngrID",
                                message: "Select the new manager that this employee will work under:",
                                type: "list",
                                default: "null",
                                choices: results
                            }
                        ])
                        .then(answer => {
                            db.query(`UPDATE employee SET manager_id = "${answer.mngrID}" WHERE id = "${answerBank.selectEmployee}"`, function (err) {
                                if (err) throw (err);
                                console.log("Successfully updated manager");
                            });
                            menu();        
                        });
                    });
                };
                getMngrList2();
            });
        });
    };
    getEmpList2();
};

// FIXME: 
// function viewEmpByMngr() {
//     db.query(`SELECT E.id, CONCAT(E.first_name, " ", E.last_name) AS name, R.title AS "job title", R.salary, D.name AS department FROM employee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.id LEFT JOIN department D ON R.department_id = D.id GROUP BY M.first_name, M.last_name ORDER BY M.last_name;`, function (err, results) {
//         if (err) throw (err);
//         console.table(results);
//         menu();
//     });
// };

// FIXME:
// function viewEmpByDpt() {
//     db.query(`SELECT E.id, CONCAT(E.first_name, " ", E.last_name) AS name, R.title AS "job title", R.salary, D.name AS department FROM employee E LEFT JOIN employee M ON E.manager_id = M.id LEFT JOIN role R ON E.role_id = R.id LEFT JOIN department D ON R.department_id = D.id GROUP BY department;`, function (err, results) {
//         if (err) throw (err);
//         console.table(results);
//         menu();
//     });
// };

// TODO: add cascading delete? Otherwise functional
function deleteDepartment() {
    const getDeptList2 = () => {
        db.query(`SELECT id AS value, name FROM department;`, function (err, results) {
            if (err) throw (err);
            inquirer.prompt([
                {
                    name: "deleteDept",
                    message: "Which department are you removing?",
                    type: "list",
                    choices: results,
                },
            ])
            .then(answer => {
                console.log(answer);
                db.query(`DELETE FROM department WHERE id = "${answer.deleteDept}" `, function (err) {
                    if (err) throw (err);
                    console.log("Successfully removed department");
                });
                menu(); 
            });
        });
    };
    getDeptList2();
};

// function deleteRole() {
// 
// };

// function deleteEmployee() {
// 
// };

// function viewTotalBudget() {
// 
// };

// function viewBudgetByDept() {
// 
// };