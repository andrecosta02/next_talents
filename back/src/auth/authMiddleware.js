const jwt = require('jsonwebtoken');
const redisClient = require('../redisClient');  // Importando o Redis Client

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Token não fornecido');
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }

        redisClient.get(token, (err, data) => {
            if (err) throw err;
            if (data) {
                return res.status(401).send('Token inválido');
            }

            req.user = user;
            next();
        });
    });
};

module.exports = authenticateToken;
