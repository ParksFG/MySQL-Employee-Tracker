const inquirer = require('inquirer');
const mysql = require("mysql2");
require('console.table');

// Main App Questions
const actions = {
    viewAllEmployees: "View All Employees.",
    viewAllDepartments: "View All Departments.",
    viewAllRoles: "View All Roles.",
    addEmployee: "Add an Employee.",
    addRole: "Add a Role.",
    addDepartment: "Add a Department.",
    updateEmployeeRole: "Update an Employee's Role.",
    quit: "Quit."
}

// Questions for adding employee
const addEmployeeActions = [
    {
        type: 'input',
        name: 'fName',
        message: `Enter the employee's first name.`
    },
    {
        type: 'input',
        name: 'lName',
        message: `Enter the employee's last name.`
    },
    {
        type: 'number',
        name: 'roleID',
        message: 'Enter the role ID for this employee.'
    },
    {
        type: 'number',
        name: 'managerID',
        message: `Enter the ID of this employee's manager. Leave blank if they don't have a manager.`,
        default: 'NULL'
    }
]

// Questions for adding role
const addRoleActions = [
    {
        type: 'input',
        name: 'title',
        message: `Enter the role's title.`
    },
    {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for this role.'
    },
    {
        type: 'number',
        name: 'department_id',
        message: 'Enter the department ID this role belongs to.',
        default: '1'
    }
]

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
                actions.viewAllDepartments,
                actions.viewAllRoles,
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

                case actions.viewAllDepartments:
                    viewAllDepartments();
                    break;

                case actions.viewAllRoles:
                    viewAllRoles();
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
        console.log(`\n`);
        appQuestions();
    })
};

function viewAllDepartments() {
    const query = `SELECT department.depName as Departments FROM department`;
    db.query(query, (err, res) => {
        console.log(`\n`);
        console.table(res);
        console.log(`\n`);
        appQuestions();
    })
};

function viewAllRoles() {
    const query = `SELECT role.title as 'Role Name', role.salary as Salary, department.depName AS Department
    FROM role
    JOIN department
    ON role.department_id = department.id;`;
    db.query(query, (err, res) => {
        console.log(`\n`);
        console.table(res);
        console.log(`\n`);
        appQuestions();
    })
};

function addEmployee() {
    inquirer
        .prompt(addEmployeeActions)
        .then((answers) => {
            const newEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("` + answers.fName + `", "` + answers.lName + `", ` + answers.roleID + `, ` + answers.managerID + `)`;
            db.query(newEmployee, (err, res) => {
                console.log(`\n`);
                console.log(`New employee added.`);
                console.log(`\n`);
                appQuestions();
            });
        });
};

function addRole() {
    inquirer
        .prompt(addRoleActions)
        .then((answers) => {
            const newRole = `INSERT INTO role (title, salary, department_id)
            VALUES ("` + answers.title + `", ` + answers.salary + `, ` + answers.department_id + ')';
            db.query(newRole, (err, res) => {
                console.log(`\n`);
                console.log(`New role added.`);
                console.log(`\n`);
                appQuestions();
            });
        });
};
