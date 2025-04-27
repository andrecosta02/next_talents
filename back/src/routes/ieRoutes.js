const express = require("express")
const router = express.Router()

const ieController = require("../clients/ie/ieController.js")

router.post("/register", ieController.register)  // Registro - Aluno

module.exports = router