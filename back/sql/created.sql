use we_expedition;

-- Tabela USERS
CREATE TABLE USERS (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    last_name VARCHAR(255),
    cpf VARCHAR(11),
    hash_psw VARCHAR(255),
    gender CHAR(1),
    birth DATE,
    cep VARCHAR(20),
    city VARCHAR(255),
    we_current VARCHAR(255),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela ALERTS
CREATE TABLE ALERTS (
    id INT PRIMARY KEY,
    user_id INT,
    `order` VARCHAR(255),
    message VARCHAR(255),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Tabela WE
CREATE TABLE WE (
    id INT PRIMARY KEY,
    cod VARCHAR(255),
    hash_psw VARCHAR(255),
    user_creator INT,
    location_origin VARCHAR(255),
    location_destination VARCHAR(255),
    criation VARCHAR(255),
    expiration VARCHAR(255),
    we_status VARCHAR(5),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_creator) REFERENCES USERS(id)
);