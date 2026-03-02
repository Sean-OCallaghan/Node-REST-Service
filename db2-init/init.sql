CONNECT TO testdb;

CREATE TABLE db2inst1.users (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    email VARCHAR(100),
    mobile VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE db2inst1.orders (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    item VARCHAR(100),
    amount DECIMAL(10,2),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES db2inst1.users(id)
);

CONNECT RESET;