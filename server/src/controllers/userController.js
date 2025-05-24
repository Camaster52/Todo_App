const UserService = require("../services/userService")

// reg
const createUser = async (req , res) => {
    try{
        const createdUser = await UserService.createUser(req.body)
        res.status(201).json(createdUser)
    }
    catch(error){
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
        const loginedUser = await UserService.loginUser(req.body)
        res.status(201).json(loginedUser)
    }
    catch(error){
        if(error.message.includes("Email and password are required")){
            res.status(400).json({error: error.message})
        }
        else if(error.message.includes("User not found")){
            res.status(409).json({error: error.message})
        }
        else if(error.message.includes("Invalid password")){
            res.status(400).json({error: error.message})
        }
        else if(error.message.includes("Invalid email format")){
            res.status(400).json({error: error.message})
        }
        else{
            res.status(500).json({error: error.message})
        }
    }
}
module.exports = {
    createUser,
    loginUser
}