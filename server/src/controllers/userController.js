const UserService = require("../services/userService")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const userService = require("../services/userService")
require("dotenv").config()

const createUser = async (req , res) => {
    try{
        console.log("Front data: " , req.body)
        const { user , token } = await UserService.createUser(req.body)
        
        res.cookie("jwt" , token , {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            success: true, 
            user: {id: user.id, email: user.email}
        })
        console.log("Success sign up: " , user)
    }
    catch(error){
        console.log("Controller sign up error: " , error)
        if(error.message.includes("User with this email already exists")){
            res.status(409).json({error: error.message})
        }
        else if(error.message.includes("Email and password are required")){
            res.status(400).json({error: error.message})
        }
        else if(error.message.includes("Invalid email format")){
            res.status(400).json({error: error.message})
        }
        else if(error.message.includes("The password does not meet the requirements")){
            res.status(400).json({error: error.message})
        }
        else{
            res.status(500).json({error: error.message})
        }
    }
}



const loginUser = async(req , res) => {
    try{
        console.log("Front data: " , req.body)
        const { user , token } = await UserService.loginUser(req.body)
        res.cookie("jwt" , token , {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true, 
            user: {id: user.id, email: user.email}
        })
        console.log("Success log in: " , user)
    }
    catch(error){
        console.log("Controller log in error: " , error)
        if(error.message.includes("Email and password are required")){
            res.status(400).json({error: error.message})
        }else if(error.message === "User not found" || error.message.includes("User not found")) {
            res.status(404).json({ error: "User not found" });
        }else if(error.message === "Invalid password" || error.message.includes("Invalid password")) {
            res.status(400).json({ error: "Invalid password" });
        }else if(error.message.includes("Invalid email format")){
            res.status(400).json({error: error.message})
        }else if(error.message.includes("Database error")){
            res.status(500).json({error: error.message})
        }
    }
}



const checkJWT= (req , res) => {
    const token = req.cookies.jwt

    if(!token){
        const tokenError = "Token not found"
        console.error(tokenError)
        return (
            res.status(401).json({message: tokenError})
        )
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        console.log("Success  JWT verification")
        res.status(200).json({success: true , result: decoded})
    }catch(error){
        console.error("JWT verification error: " , error)
        res.status(401).json({success: false , message: error.message})
    }
}



const logout = (req , res) => {
    try{
        res.clearCookie("jwt" , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            path: '/', 
        })
        res.status(200).json({success: true , message: 'Logged out successfully' })
    }catch(error){
        console.error('Logout error:', error)
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
}



const feedback = async (req , res) => {

    const { problem , name } = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'feedback',
        text: problem
    }

    try{
        await transporter.sendMail(mailOptions)
        res.status(200).json({ success: true })
    }catch(error){
        console.log("feedback error: " , error)
        res.status(500).json({ success: false , message: error.message })
    }
}




const createTask = async (req , res) => {
    try{
        const { result } = await UserService.createTask(req.body)
        res.status(200).json({success: true , result: result})
    }catch(error){
        res.status(500).json({success: false , error: error.message})
    }
}



const getTasks = async (req , res) => {
    try{
        const { userID } = req.query
        const result = await UserService.getTasks(userID)
        res.status(200).json({success: true , result: result})
    }catch(error){
        res.status(500).json({success: false , error: error.message})
    }
}



const deleteTask = async (req , res) => {
    try{
        const { text, userID } = req.body
        const result = await userService.deleteTask(text, userID)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({success: false , error: error.message})
    }
}


module.exports = {
    createUser,
    loginUser,
    checkJWT,
    logout,
    feedback,
    createTask,
    getTasks,
    deleteTask
}