const express = require("express")
const router = express.Router()
const usersController = require("../users/usersController.js")

router.post("/register", usersController.register)  // Criar um novo usuário
router.post("/register", usersController.register)  // Criar um novo usuário

module.exports = router