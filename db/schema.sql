-- Removes any existing db of the same name to avoide duplicates, then recreates it
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Switched active db to employee_db to allow user to work on it
USE employee_db;

-- Creating tables based on criteria from user story request
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(15, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    -- Don't forget, the following will link to the manager of this employee, can be null if they have no manager
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

-- Using this for quick testing/debugging purposes
SHOW TABLES;