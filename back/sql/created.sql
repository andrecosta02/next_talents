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








-- Criação do Banco de Dados
CREATE DATABASE next_talents;
USE next_talents;

-- Tabela: student
CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    birth DATE,
    pass VARCHAR(256) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    cep VARCHAR(20),
    city VARCHAR(255),
    notification_email BOOLEAN DEFAULT FALSE,
    notification_vacancies BOOLEAN DEFAULT FALSE,
    notification_course BOOLEAN DEFAULT FALSE,
    darkmode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela: IE (Instituição de Ensino)
CREATE TABLE ie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(256) NOT NULL,
    unit VARCHAR(256),
    email VARCHAR(256) NOT NULL UNIQUE,
    pass VARCHAR(256) NOT NULL,
    cgc VARCHAR(11) UNIQUE,
    notification_email BOOLEAN DEFAULT FALSE,
    darkmode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela: enterprise
CREATE TABLE enterprise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(256) NOT NULL,
    unit VARCHAR(256),
    email VARCHAR(256) NOT NULL UNIQUE,
    pass VARCHAR(256) NOT NULL,
    cgc VARCHAR(11) UNIQUE,
    notification_email BOOLEAN DEFAULT FALSE,
    darkmode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela: courses
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ie INT NOT NULL,
    title VARCHAR(256) NOT NULL,
    description VARCHAR(256),
    link VARCHAR(256),
    deadline DATE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ie) REFERENCES ie(id)
);

-- Tabela: courses_student
CREATE TABLE courses_student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_student INT NOT NULL,
    id_course INT NOT NULL,
    start_date DATE,
    completion_date DATE,
    hours_performed VARCHAR(5),
    id_partnership INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_partnership) REFERENCES enterprise(id),
    FOREIGN KEY (id_student) REFERENCES student(id),
    FOREIGN KEY (id_course) REFERENCES courses(id)
);

-- Tabela: certificates
CREATE TABLE certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_student INT NOT NULL,
    id_course INT NOT NULL,
    hours VARCHAR(5),
    date DATE,
    img VARCHAR(256),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES student(id),
    FOREIGN KEY (id_course) REFERENCES courses(id)
);

-- Tabela: vacancies
CREATE TABLE vacancies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_enterprise INT NOT NULL,
    title VARCHAR(256) NOT NULL,
    description VARCHAR(256),
    start_date DATE,
    end_date DATE,
    quantity INT DEFAULT 1,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id)
);

-- Tabela: students_registered
CREATE TABLE students_registered (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_student INT NOT NULL,
    id_vacancy INT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES student(id),
    FOREIGN KEY (id_vacancy) REFERENCES vacancies(id)
);