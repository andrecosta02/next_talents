const registerService = require("./studentService")
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');
const clientEmail = require("../../clientEmail.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET = "weexpedition"; // Use o mesmo que você usa para gerar os outros tokens

const date = new Date()
const fullDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`

module.exports = {

    login: async (req, res) => {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const user = await registerService.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }

            const passwordMatch = await bcrypt.compare(pass, user.pass);

            if (!passwordMatch) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }

            if (!user.is_active) {
                return res.status(403).json({ message: "Conta não ativada. Verifique seu e-mail para confirmar o cadastro." });
            }

            const token = jwt.sign({ id: user.id, type: "student" }, SECRET, { expiresIn: "2h" });

            res.status(200).json({
                message: "Login realizado com sucesso!",
                token: token
            });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    },

    register: async (req, res) => {
        const json = { statusCode: "", message: "", result: [] }


        let hash_psw = ""

        const name = req.body.name
        const last_name = req.body.last_name
        const email = req.body.email
        const birth = req.body.birth
        const pass = req.body.pass
        const cpf = req.body.cpf
        const cep = req.body.cep
        const city = req.body.city

        json.result = [name, last_name, email, birth, pass, cpf, cep, city]

        const registerValidation = [
            body('name')
                .notEmpty().withMessage('name cannot be empty')
                .isString().withMessage('name must be a string')
                .isLength({ min: 3, max: 60 }).withMessage('name must be between 3 and 60 characters'),

            body('last_name')
                .notEmpty().withMessage('last_name cannot be empty')
                .isString().withMessage('last_name must be a string')
                .isLength({ min: 3, max: 60 }).withMessage('last_name must be between 3 and 60 characters'),

            body('email')
                .notEmpty().withMessage('email cannot be empty')
                .isString().withMessage('email must be a string')
                .isEmail().withMessage('email must be a valid email address')
                .isLength({ min: 3, max: 60 }).withMessage('email must be between 3 and 60 characters'),

            body('birth')
                .notEmpty().withMessage('birth cannot be empty')
                .isString().withMessage('birth must be a string')
                .matches(/^\d{8}$/).withMessage('birth must be in the format AAAAMMDD')
                .custom((value) => {
                    if (isAdult(value) < 18) {
                        throw new Error('User must be at least 18 years old');
                    }
                    return true;
                }),

            body('pass')
                .notEmpty().withMessage('pass cannot be empty')
                .isString().withMessage('pass must be a string')
                .isLength({ min: 8 }).withMessage('pass must be at least 8 characters long')
                .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('pass must contain at least one special character'),

            body('cpf')
                .notEmpty().withMessage('cpf cannot be empty')
                .isString().withMessage('cpf must be a string')
                .isLength({ min: 11, max: 11 }).withMessage('cpf must be 11 characters')
                .matches(/^\d+$/).withMessage('CPF must contain only numbers'),

            body('cep')
                .notEmpty().withMessage('cep cannot be empty')
                .isString().withMessage('cep must be a string')
                .isLength({ min: 8, max: 8 }).withMessage('CEP must be exactly 8 characters long')
                .matches(/^\d+$/).withMessage('CEP must contain only numbers'),

            body('city')
                .notEmpty().withMessage('City is required')
                .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters long')
                .matches(/^[a-zA-Z\s]+$/).withMessage('City must contain only letters and spaces')
        ];

        await Promise.all(registerValidation.map(validation => validation.run(req)))

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({ statusCode: 400, message: 'Erro de validação', errors: errors.array() })
            return
        } else {
            hash_psw = await hashPassword(pass);
            // console.log(hash_psw)
        }

        const returnQry = await registerService.register(name, last_name, email, birth, hash_psw, cpf, cep, city);
        const codeReturn = returnQry.code; // 1 = OK, 2 = User Not Found

        if (codeReturn == "1") {
            res.status(201);
            json.statusCode = 201;
            json.message = returnQry.message;  // <- agora pega o "message" certo
            json.result = returnQry.description;  // <- agora pega a descrição certa

            // Gerar token de ativação
            const token = jwt.sign({ id: returnQry.userId, type: "student" }, SECRET, { expiresIn: "24h" });
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        
            await registerService.saveActivationToken(returnQry.userId, token, expiresAt);
        
            let emailTitle = "Confirmação de Cadastro - Next Talents";
            let emailText = `Olá, ${name} ${last_name},\n\n` +
                "Obrigado por se cadastrar na plataforma Next Talents!\n\n" +
                "Para ativar seu cadastro, clique no link abaixo:\n" +
                `https://seusite.com/confirm-email?token=${token}\n\n` +
                "Esse link é válido por 24 horas.";
        
            await clientEmail.envEmail(email, emailTitle, emailText);
        } else {
            res.status(422);
            json.statusCode = 422;
            json.message = returnQry[1];  // ainda puxando do vetor antigo (como está seu service)
            json.result = "";
        }

        res.json(json);
        IpPublicQuery(req);
    },

    update: async (req, res) => {
        const userId = req.user.id; // Pegando o id do usuário autenticado via middleware
        const allowedFields = ["name", "last_name", "email", "cep", "city", "notification_email", "notification_vacancies", "notification_course", "darkmode"];
        const updates = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Nenhum campo válido para atualizar." });
        }

        try {
            const result = await registerService.updateStudentById(userId, updates);
            res.status(200).json({ message: "Dados atualizados com sucesso!", result });
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    },

    forgotPass: async (req, res) => {
        const { email } = req.body;
        const user = await registerService.getUserByEmail(email); // você pode criar essa função se ainda não existir
    
        if (!user) {
            return res.status(200).json({ message: "If this email exists, a reset link has been sent." });
        }
    
        const token = jwt.sign(
            { id: user.id, type: 'student' },
            SECRET,
            { expiresIn: '1h' }
        );
    
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validade
        await registerService.saveResetToken(user.id, token, expiresAt);
    
        const resetLink = `https://seusite.com/reset-password?token=${token}`;
        const emailTitle = "Recuperação de senha Next Talents";
        const emailText = `Olá, ${user.name},\n\nPara redefinir sua senha, clique no link abaixo:\n${resetLink}\n\nEsse link é válido por 1 hora.`;
    
        await clientEmail.envEmail(email, emailTitle, emailText);
    
        res.status(200).json({ message: "If this email exists, a reset link has been sent." });
    },

    resetPass: async (req, res) => {
        const { token, newPassword } = req.body;
    
        try {
            const decoded = jwt.verify(token, SECRET);
            const tokenData = await registerService.findResetToken(token);
    
            if (!tokenData) {
                return res.status(400).json({ message: "Invalid or expired token." });
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await registerService.updatePassword(tokenData.user_id, hashedPassword);
            await registerService.markTokenAsUsed(tokenData.id);
    
            res.status(200).json({ message: "Password updated successfully!" });
        } catch (error) {
            res.status(400).json({ message: "Invalid or expired token." });
        }
    },

    confirmEmail: async (req, res) => {
        const { token } = req.body;  // ou pode pegar via query: req.query.token, você escolhe
    
        if (!token) {
            return res.status(400).json({ message: "Token não fornecido." });
        }
    
        try {
            const decoded = jwt.verify(token, SECRET);
            const tokenData = await registerService.findActivationToken(token);
    
            if (!tokenData) {
                return res.status(400).json({ message: "Token inválido ou expirado." });
            }
    
            // Ativando o usuário
            await registerService.activateStudentById(tokenData.user_id);
            await registerService.markActivationTokenAsUsed(tokenData.id);
    
            res.status(200).json({ message: "Cadastro ativado com sucesso!" });
        } catch (error) {
            console.error("Erro na ativação de cadastro:", error);
            res.status(400).json({ message: "Token inválido ou expirado." });
        }
    },


}

const isAdult = (value) => {
    const today = new Date();
    const birthDate = new Date(value.slice(0, 4), value.slice(4, 6) - 1, value.slice(6, 8));
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }
    return age;
};

function IpPublicQuery(req) {
    console.log(` - ${req.method}`)
    console.log(` - ${req.baseUrl}${req.url}`)
    console.log(` - ${req.connection.remoteAddress} } \n`)
}



function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}