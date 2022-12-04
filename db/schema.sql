DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (30) NOT NULL
);
CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR (30) NOT NULL,
    department_id INT,
    salary DECIMAL(9, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    dept_id INT,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL(9, 2) NOT NULL,
    manager_name VARCHAR(10) NOT NUll,
    FOREIGN KEY (dept_id) REFERENCES roles(role_id)
);
