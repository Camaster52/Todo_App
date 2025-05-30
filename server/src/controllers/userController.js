const UserService = require("../services/userService")

// reg
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

// log
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
module.exports = {
    createUser,
    loginUser
}