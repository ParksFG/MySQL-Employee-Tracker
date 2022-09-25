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
}
