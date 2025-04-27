const express = require("express")
const router = express.Router()

const registerController = require("../clients/student/studentController.js")

router.post("/login", registerController.login)  // Login - Aluno
router.post("/register", registerController.register)  // Registro - Aluno
router.post("/update", registerController.update)  // Update - Aluno
router.post("/forgot-pass", registerController.forgotPass)  // Esqueci senha - Aluno
router.post("/reset-pass", registerController.resetPass)  // Resetar senha - Aluno

module.exports = router