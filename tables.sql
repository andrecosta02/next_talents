-- Criação do Banco de Dados
CREATE DATABASE next_talents;
USE next_talents;

-- Tabela: Aluno
CREATE TABLE Aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(256),
    email VARCHAR(256),
    data_nascimento DATE,
    pass VARCHAR(256),
    cgc VARCHAR(11),
    notifica_email BOOLEAN,
    notifica_vagas BOOLEAN,
    notifica_cursos BOOLEAN,
    darkmode BOOLEAN
);

-- Tabela: IE (Instituição de Ensino)
CREATE TABLE IE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(256),
    unidade VARCHAR(256),
    email VARCHAR(256),
    pass VARCHAR(256),
    cgc VARCHAR(11),
    notifica_email BOOLEAN,
    darkmode BOOLEAN
);

-- Tabela: EMPRESA
CREATE TABLE EMPRESA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(256),
    unidade VARCHAR(256),
    email VARCHAR(256),
    pass VARCHAR(256),
    cgc VARCHAR(11),
    notifica_email BOOLEAN,
    darkmode BOOLEAN
);

-- Tabela: Cursos Disponíveis
CREATE TABLE Cursos_Disponiveis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ie INT,
    titulo VARCHAR(256),
    descricao VARCHAR(256),
    link VARCHAR(256),
    data_limite DATE,
    ativo BOOLEAN,
    FOREIGN KEY (id_ie) REFERENCES IE(id)
);

-- Tabela: Cursos do Aluno
CREATE TABLE Cursos_do_Aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_curso INT,
    data_inicio DATE,
    data_conclusao DATE,
    horas_realizadas VARCHAR(5),
    parceria BOOLEAN,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id),
    FOREIGN KEY (id_curso) REFERENCES Cursos_Disponiveis(id)
);

-- Tabela: Certificados
CREATE TABLE Certificados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_curso INT,
    horas VARCHAR(5),
    data DATE,
    img VARCHAR(256),
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id),
    FOREIGN KEY (id_curso) REFERENCES Cursos_Disponiveis(id)
);

-- Tabela: Vagas
CREATE TABLE Vagas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_empresa INT,
    titulo VARCHAR(256),
    descricao VARCHAR(256),
    data_inicio DATE,
    data_fim DATE,
    quantidade INT,
    ativo BOOLEAN,
    FOREIGN KEY (id_empresa) REFERENCES EMPRESA(id)
);

-- Tabela: alunos_inscritos
CREATE TABLE alunos_inscritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_vaga INT,
    data DATE,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id),
    FOREIGN KEY (id_vaga) REFERENCES Vagas(id)
);
