const express = require("express")
const router = express.Router()
const loginController = require("../login/loginController.js")

router.post("/aluno", loginController.register)  // Login Aluno
router.post("/ie", loginController.register)  // Login IE
router.post("/empresa", loginController.register)  // Login Empesa

module.exports = router