const express = require("express")
const router = express.Router()
const showdown = require("showdown");

const converter = new showdown.Converter();

const loginRoute = require("./loginRoutes.js")
const registerRoute = require("./registerRoutes.js")
// const authRoute = require("./authRoutes.js")

router.use("/login", loginRoute)
router.use("/register", registerRoute)
// router.use("/auth", authRoute)

module.exports = router