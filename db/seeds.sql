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
VALUES ("History Instructor", 60000, 1),
       ("Science Instructor", 60000, 3),
       ("Business Instructor", 60000, 7),
       ("Math TA", 40000, 2),
       ("Game Design TA", 40000, 6),
       ("English TA", 40000, 4),
       ("Art Advisor", 35000, 5),
       ("History Advisor", 35000, 1),
       ("Science Advisor", 35000, 3),
       ("Business Advisor", 35000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Richie", "Holmes", 1, NULL),
       ("Hattie", "Jacobson", 8, 1),
       ("Christina", "Rowe", 2, NULL),
       ("Nathan", "Vasquez", 9, 3),
       ("Kyron", "Edwards", 3, NULL),
       ("Cecily", "Day", 4, NULL),
       ("Nevaeh", "Newton", 5, NULL),
       ("Soraya", "Castillo", 6, NULL),
       ("Jerry", "Anderson", 7, NULL),
       ("Gareth", "Barron", 10, 5);