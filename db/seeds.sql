INSERT INTO department (depName)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Accountant Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Software Engineer", 120000, 2),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 1, NULL),
       ("Kunal", "Singh", 4, NULL),
       ("Mike", "Chan", 2, 1),
       ("Malia", "Brown", 5, 2);