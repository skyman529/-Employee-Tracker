INSERT INTO department (department_name) 
VALUES ('Movies_dept'),
       ('Auto_dept'),
       ('Videogame_dept'),
       ('Hometheater_dept'),
       ('Appliances_dept'),
       ('Camera_dept'),
       ('Computer_dept'),
       ('Television_dept'),
       ('Exercise_dept');

INSERT INTO roles (job_title, salary, department_id) 
VALUES ('Cashier', 30000, 4),
       ('Stocker', 42000, 2),
       ('Manager', 90000, 1),
       ('Sales', 50000, 3);



INSERT INTO employees (first_name, last_name, dept_id, job_title, salary, manager_name)
VALUES ('Sky', 'Martinez', 4, 'Cashier', 30000, 'Natalie' ),
       ('Natalie', 'Martin', 2, 'Stocker', 32000, 'Jeffry' ),
       ('Jeffry', 'Gaylor', 1, 'Manager', 50000, 'Owner' ),
       ('April', 'Frools', 3, 'Sales', 40000, 'Jeffry' );