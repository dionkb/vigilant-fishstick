-- Setting up generic seed info to aid in more visual testing
INSERT INTO department (name)
VALUES ("History"),
       ("Math"),
       ("Science"),
       ("English"),
       ("Art"),
       ("Game Design"),
       ("Business");

INSERT INTO role (title, salary, department_id)
VALUES ("Instructor", 60000, 1),
       ("TA", 40000, 3),
       ("SSA", 30000, 6),
       ("Advisor", 35000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("D", "B", 1, NULL),
       ("R", "B", 2, NULL),
       ("N", "H", 4, NULL),
       ("M", "L", 3, NULL),
       ("D", "K", 4, NULL),
       ("A", "J", 4, NULL);