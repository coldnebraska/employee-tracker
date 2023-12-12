INSERT INTO departments (name)
VALUES ("English"),
       ("Science");

INSERT INTO roles (title, salary, department_id)
VALUES ("Teacher", "40000", 1),
       ("Assistant", "25000", 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Derek", "Lizzard", 1, 1),
       ("Jenny", "Trav", 2, 2),
       ("Melissa", "Hook", 2, 2),
       ("Cow", "Lord", 2, 2);
