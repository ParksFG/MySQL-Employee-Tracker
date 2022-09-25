SELECT employee.id as ID, CONCAT(employee.last_name, ', ', employee.first_name) AS 'Employee Name', role.title as Position, department.depName AS Department, role.salary AS Salary, IFNULL(CONCAT(manager.last_name, ', ', manager.first_name), 'N/A') AS Manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
JOIN role 
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id;


