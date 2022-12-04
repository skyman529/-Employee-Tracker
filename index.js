const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql2");
const connect = mysql.createConnection
  ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
},

console.log(`Connected to the employee_tracker_db database.`));

function start() {
inquirer
.prompt({
  name: "startPage",
  type: "list",
  choices: [
    "See all departments",
    "See all employees",
    "See all roles",
    "Update Current employee role",
    "Create a department",
    "Create an employee",
    "Create a role",
  ],
})
.then((res) => {
const answer = res.startPage;
       if (answer === "See all departments") {
         viewDepartments();
       } else if (answer === "See all employees") {
         viewEmployees();
       } else if (answer === "See all roles") {
         viewRoles();
       } else if (answer === "Update Current employee role") {
         updateEmployeeRole();
       } else if (answer === "Create a department") {
         addDepartment();
       } else if (answer === "Create an employee") {
         addEmployee();
       } else if (answer === "Create a role") {
         addRoles();
       } else {
         console.log("Invalid entry, please try again");
       }
     });
 }
 
function viewDepartments() {
   const data = `SELECT * FROM DEPARTMENT`;
   connect.query(data, (err, res) => {
     if (res) {
       console.table(res);
     }
     start();
   });
 }
 
function viewEmployees() {
   const data = `SELECT * FROM employees`;
   connect.query(data, (err, res) => {
     if (res) {
       console.table(res);
     }
     start();
   });
 }

function viewRoles() {
    const data = `SELECT * FROM roles`;
    connect.query(data, (err, res) => {
      if (res) {
        console.table(res);
      }
      start();
    });
  }
 
function addDepartment() {
   const data = `SELECT * FROM department`;
   connect.query(data, (err, res) => {
     if (res) {
       console.table(res);
     }
     inquirer
       .prompt({
         type: "input",
         name: "addDept",
         message: "New department name?",
       })
       .then((answer) => {
         connect.query("INSERT INTO department SET ?", {
           department_name: answer.addDept,
         });
         viewDepartments();
       });
   });
 }
 
function addRoles() {
   const data = `SELECT DISTINCT * FROM roles`;
   connect.query(data, (err, res) => {
         if (err) throw err;
    inquirer
       .prompt([
        {
           type: "input",
           name: "addTitle",
           message: "Add new role title.",
         },
         {
           type: "input",
           name: "addSalary",
           message: "Add new role salary.",
         },
         {
           type: "input",
           name: "addDeptId",
           message: "Add new role department id.",
           validate: (input) => {
             if (isNaN(input)) {
               console.log("invalid department number. Please select a valid department number");
               return false;
             } else {
               return true;
             }
           },
         },
       ])
       .then((answer) => {
         connect.query("INSERT INTO roles SET ?", {
           job_title: answer.addTitle,
           salary: answer.addSalary,
           department_id: answer.addDeptId,
         });
         viewDepartments();
       });
   });
 }
 
function addEmployee() {
   const data = `SELECT DISTINCT * FROM employees`;
   connect.query(data, (err, res) => {
     connect.query(data, (err, res) => {
       if (err) throw err;
       inquirer
         .prompt([
           {
             type: "input",
             name: "firstname",
             message: "Please enter first name.",
           },
           {
             type: "input",
             name: "lastname",
             message: "Please enter last name.",
           },
           {
             type: "input",
             name: "deptId",
             message: "Please enter department id.",
           },
           {
             type: "input",
             name: "jobTitle",
             message: "Please enter job title.",
           },
           {
             type: "input",
             name: "salary",
             message: "Please enter salary amount $00000.00.",
           },
           {
             type: "input",
             name: "manager",
             message: "Please give a reporting manager.",
           },
         ])
         .then((answer) => {
           connect.query("INSERT INTO employees SET ?", {
             first_name: answer.firstname,
             last_name: answer.lastname,
             dept_id: answer.deptId,
             job_title: answer.jobTitle,
             salary: answer.salary,
             manager_name: answer.manager,
           });
           viewDepartments();
         });
     });
   });
 }

function updateEmployeeRole() {
  const data = `SELECT DISTINCT * FROM employees`;
  connect.query(data, (err, employee_result) => {
    connect.query(data, `SELECT * FROM roles`, (err, role_result) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "What employee do you want to update",
            choices: () =>
              employee_result.map(
                (employee_result) => employee_result.first_name
              ),
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What role would you like to assign the selected employee?",
            choices: () =>
              role_result.map((role_result) => role_result.job_title),
         },
        ])
        .then((answer) => {
           const updateSQL = `UPDATE employees SET job_title = ?  WHERE first_name = ?`;
          const results = [answer.employeeRole, answer.employee];
           connect.query(updateSQL, results, (req, res) => {
           console.log("Employee updates have been made.");
        });
         start();
        });
    });
  });
}

start();