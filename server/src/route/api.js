const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//routes
router.post("/signup" , userController.createUser)
router.post("/login" , userController.loginUser)
router.get("/checkJWT" , userController.checkJWT)
router.post("/logout" , userController.logout)

module.exports = router