const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//index routes
router.post("/signup" , userController.createUser)
router.post("/login" , userController.loginUser)
router.get("/checkJWT" , userController.checkJWT)
router.post("/logout" , userController.logout)
router.post("/feedback" , userController.feedback)

// tasks
router.post("/createTask" , userController.createTask)
router.get("/getTasks" , userController.getTasks)
router.post("/deleteTask" , userController.deleteTask)

module.exports = router