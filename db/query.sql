SELECT employee.id as ID, employee.first_name, employee.last_name, role.title as position, role.salary, department.depName AS department, employee.manager_id
FROM employee
JOIN role 
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id;
