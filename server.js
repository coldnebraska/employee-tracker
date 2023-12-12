const inquirer = require("inquirer")
const mysql = require("mysql2")

function init() {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'N3braska!',
            database: 'company_db'
        }
    )

    inquirer
        .prompt({
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        })
        .then((data) => {
            console.log(data.selection)
            switch (data.selection) {
                case "View All Employees":
                    db.query("SELECT employees.id AS id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, employees.manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;", function (err, results) {
                        console.log(results)
                    })
                    init()
                    break
                case "Add Employee":
                    inquirer.prompt([{
                        type: "input",
                        name: "first_name",
                        message: "Please enter the employees first name."
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "Please enter the employees last name."
                    },
                    {
                        type: "input",
                        name: "role_id",
                        message: "Please enter the role id for the employee."
                    },
                    {
                        type: "input",
                        name: "manager_id",
                        message: "Please enter the manager id for the employee."
                    }
                ])
                    .then((data) => {
                        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}');`, function (err, results) {
                            if (err) {console.log(err)} else {console.log("Success")}
                            init()
                        })
                    })
                    break
                case "Update Employee Role":
                    db.query("SELECT employees.first_name, employees.last_name, employees.role_id FROM employees", function (err, results) {
                        console.log(results)
                        let list = []
                        for (i = 0; i < results.length; i++) {
                            list.push(`${results[i].first_name} ${results[i].last_name}`)
                        }
                        inquirer.prompt({
                            type: "list",
                            name: "update",
                            message: "Please select an employee to update",
                            choices: list
                        })
                        .then((data) => {
                            let employeeName = data.update
                            let employeeArray = employeeName.split(" ")
                            let employeeFirstName = employeeArray[0]
                            let employeeLastName = employeeArray[1]
                            inquirer.prompt({
                                type: "input",
                                name: "role",
                                message: `Please enter ${employeeName} new role id`
                            })
                            .then((data) => {
                                db.query(`UPDATE employees SET role_id = ${data.role} WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`, function (err, results) {
                                    if (err) {console.log(err)} else {console.log("Success")}
                                    init()
                                })
                            })
                        })
                    })
                    break
                case "View All Roles":
                    db.query("SELECT * FROM roles;", function (err, results) {
                        console.log(results)
                        init()
                    })
                    break
                case "Add Role":
                    inquirer.prompt([{
                        type: "input",
                        name: "title",
                        message: "Please enter a name for the new role."
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Please enter the salary for the new role."
                    },
                    {
                        type: "input",
                        name: "department_id",
                        message: "Please enter the department id for the role."
                    }
                ])
                    .then((data) => {
                        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', '${data.department_id}')`, function (err, results) {
                            if (err) {console.log(err)} else {console.log("Success")}
                            init()
                        })
                    })
                    break
                case "View All Departments":
                    db.query("SELECT * FROM departments;", function (err, results) {
                        console.log(results)
                        init()
                    })
                    break
                case "Add Department":
                    inquirer.prompt({
                        type: "input",
                        name: "department",
                        message: "Please enter a name for the new department."
                    })
                    .then((data) => {
                        db.query(`INSERT INTO departments (name) VALUES ('${data.department}')`, function (err, results) {
                            if (err) {console.log(err)} else {console.log("Success")}
                            init()
                        })
                    })
                    break
                case "Quit":
                    process.exit(0)
            }
        })
}

init()
