// const jwt = require('jsonwebtoken');
// const redisClient = require('../redisClient');  // Importando o Redis Client

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).send('Token não fornecido');
//     }

//     jwt.verify(token, process.env.SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).send('Token inválido');
//         }

//         redisClient.get(token, (err, data) => {
//             if (err) throw err;
//             if (data) {
//                 return res.status(401).send('Token inválido');
//             }

//             req.user = user;
//             next();
//         });
//     });
// };

// module.exports = authenticateToken;


// authMiddleware.js (atualizado sem Redis)

const jwt = require('jsonwebtoken');
const SECRET = "weexpedition"; // Use a mesma secret usada no projeto

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }
        req.user = decoded; // { id, type }
        next();
    });
};

module.exports = authenticateToken;
