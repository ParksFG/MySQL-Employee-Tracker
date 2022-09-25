SELECT role.title as 'Role Name', role.salary as Salary, department.depName AS Department
FROM role
JOIN department
ON role.department_id = department.id;
