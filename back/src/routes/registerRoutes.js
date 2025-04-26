const express = require("express")
const router = express.Router()
const registerController = require("../register/registerController.js")

router.post("/aluno", registerController.register)  // Registro - Aluno
router.post("/ie", registerController.register)  // Registro - IE
router.post("/empresa", registerController.register)  // Registro - Empesa

module.exports = router