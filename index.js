const inquirer = require('inquirer');
const mysql = require("mysql2");
require('console.table');

const actions = {
    viewAllEmployees: "View All Employees.",
    viewByDepartment: "View Employees by Department.",
    viewByManager: "View Employeese by Manager.",
    addEmployee: "Add an Employee.",
    addRole: "Add a Role.",
    addDepartment: "Add a Department.",
    updateEmployeeRole: "Update an Employee's Role.",
    quit: "Quit."
}

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database')  
);

function appQuestions() {
    inquirer
        .prompt({
            type: 'list',
            name: 'selected',
            message: 'What do you want to do?',
            choices: [
                actions.viewAllEmployees,
                actions.viewByDepartment,
                actions.viewByManager,
                actions.addEmployee,
                actions.addRole,
                actions.addDepartment,
                actions.updateEmployeeRole,
                actions.quit
            ]
        })
        .then(answer => {
            switch (answer.selected) {
                case actions.viewAllEmployees:
                    viewAllEmployees();
                    break;

                case actions.viewByDepartment:
                    viewByDepartment();
                    break;

                case actions.viewByManager:
                    viewByManager();
                    break;

                case actions.addEmployee:
                    addEmployee();
                    break;
                    
                case actions.addRole:
                    addRole();
                    break;
                    
                case actions.addDepartment:
                    addDepartment();
                    break;
                    
                case actions.updateEmployeeRole:
                    updateEmployeeRole();
                    break;
                    
                case actions.quit:
                    console.log('Goodbye!')
                    process.exit();
                    break;
            }
        });
}

appQuestions()

function viewAllEmployees() {
    const query = `SELECT employee.id as ID, CONCAT(employee.last_name, ', ', employee.first_name) AS 'Employee Name', role.title as Position, department.depName AS Department, role.salary AS Salary, IFNULL(CONCAT(manager.last_name, ', ', manager.first_name), 'N/A') AS Manager
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    JOIN role 
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id;`;
    db.query(query, (err, res) => {
        console.log(`\n`);
        console.table(res);
        appQuestions();
    })

}
