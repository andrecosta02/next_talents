// studentService.js (organizado com todas as funções no module.exports principal)

const db = require("../../db.js");
let query = "";
let values = "";
let returnQry = [];
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM student WHERE email = ?`;
            values = [email];

            db.query(query, values, (error, results) => {
                if (error) {
                    consoleResult();
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results.length > 0 ? results[0] : false);
            });
        });
    },

    register: (name, last_name, email, birth, pass, cpf, cep, city) => {
        return new Promise((resolve, reject) => {
            let querySelect = `SELECT * FROM student WHERE email = ? OR cpf = ?`;
            let valueSelect = [email, cpf];

            db.query(querySelect, valueSelect, (error, results) => {
                if (results.length == 0) {
                    query = `INSERT INTO student (name, last_name, email, birth, pass, cpf, cep, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    values = [name, last_name, email, birth, pass, cpf, cep, city];

                    db.query(query, values, (error, results) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        returnQry = {
                            code: "1",
                            message: "OK",
                            userId: results.insertId, // ID do novo aluno
                            description: `Created student: ${name}`
                        };
                        consoleResult();
                        resolve(returnQry);
                    });
                } else {
                    returnQry = ["2", "Email já cadastrado, se necessario, redefina a senha"];
                    consoleResult();
                    resolve(returnQry);
                }
            });
        });
    },

    updateStudentById: (userId, updates) => {
        return new Promise((resolve, reject) => {
            const fields = Object.keys(updates);
            const setClause = fields.map(field => `${field} = ?`).join(", ");
            const values = fields.map(field => updates[field]);

            query = `UPDATE student SET ${setClause} WHERE id = ?`;
            values.push(userId);

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult(query, values);
                resolve(results);
            });
        });
    },

    saveResetToken: (userId, token, expiresAt) => {
        return new Promise((resolve, reject) => {
            query = `INSERT INTO password_resets (user_id, user_type, token, expires_at) VALUES (?, 'student', ?, ?)`;
            values = [userId, token, expiresAt];

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },

    findResetToken: (token) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM password_resets WHERE token = ? AND user_type = 'student' AND used = FALSE AND expires_at > NOW()`;
            values = [token];

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.length > 0 ? results[0] : false);
            });
        });
    },

    markTokenAsUsed: (tokenId) => {
        return new Promise((resolve, reject) => {
            query = `UPDATE password_resets SET used = TRUE WHERE id = ?`;
            values = [tokenId];

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },

    updatePassword: (userId, newPasswordHash) => {
        return new Promise((resolve, reject) => {
            query = `UPDATE student SET pass = ? WHERE id = ?`;
            values = [newPasswordHash, userId];

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },

    saveActivationToken: (userId, token, expiresAt) => {
        return new Promise((resolve, reject) => {
            query = `INSERT INTO activation_tokens (user_id, user_type, token, expires_at) VALUES (?, 'student', ?, ?)`;
            values = [userId, token, expiresAt];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },
    
    findActivationToken: (token) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM activation_tokens WHERE token = ? AND user_type = 'student' AND used = FALSE AND expires_at > NOW()`;
            values = [token];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.length > 0 ? results[0] : false);
            });
        });
    },
    
    markActivationTokenAsUsed: (tokenId) => {
        return new Promise((resolve, reject) => {
            query = `UPDATE activation_tokens SET used = TRUE WHERE id = ?`;
            values = [tokenId];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },
    
    activateStudentById: (id) => {
        return new Promise((resolve, reject) => {
            query = `UPDATE student SET is_active = TRUE WHERE id = ?`;
            values = [id];
    
            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                consoleResult();
                resolve(results);
            });
        });
    },
};

function consoleResult() {
    let date = new Date();
    const brasilTime = date.toLocaleString("pt-BR", { timeZone: "America/Recife" });

    console.log(`Consult {`);
    console.log(` - ${brasilTime}`);
    console.log(" - " + query, values);
}
