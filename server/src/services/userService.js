const { pool } = require("../DatabaseConnection/db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

class UserService {

    async isUserExist(email) {
        const { rows } = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        )
        return rows.length > 0
    }
    // reg
    async createUser(userData) {

        const { email , password } = userData
        if(!email || ! password) {
            throw new Error("Email and password are required")
        }
        if(!email.includes("@")) {
            throw new Error("Invalid email format")
        }
        if(password.length < 8) {
            throw new Error("The password does not meet the requirements")
        }
        if(await this.isUserExist(email)) {
            throw new Error("User with this email already exists")
        }
        // 
        const hashedPassword = await bcrypt.hash(password , 12)
        //
        try{
            const { rows } = await pool.query(`INSERT INTO users (email , password)
                VALUES($1 , $2)
                RETURNING id, email`,
                [email , hashedPassword]
            )
            const user = rows[0]
            const token = await this.generateToken(user)
            return { user , token }
        }
        catch(error){
            console.log("Database sign up error" , error)
            throw new Error(error)
        }
    }




    async isUserLogin(email , password) {
        const { rows } = await pool.query(`SELECT id , email , password FROM users WHERE email = $1` , [email])
        if(rows.length === 0)
        {
            throw new Error("User not found")
        }
        const user = rows[0]
        const idPasswordValid = await bcrypt.compare(password , user.password)
        if(!idPasswordValid)
        {
            throw new Error("Invalid password")
        }
        return user
    }
    // log
    async loginUser(userData) {

        const { email , password } = userData
        if(!email || !password) {
            throw new Error("Email and password are required")
        }
        if(!email.includes("@")) {
            throw new Error("Invalid email format")
        }

        const user = await this.isUserLogin(email, password);
        const token = await this.generateToken(user);
        return { user, token };
    }




    async createTask( { text , userID } ) {
        try{
            const { rows } = await pool.query(`INSERT INTO userTasks (user_id , text)
                VALUES($1 , $2)
                RETURNING *`,
            [userID , text])

            return { success: true , result: rows[0] }
        }catch(error){
            console.error("Database error: " , error)
            throw new Error("Create task error: " + error.message)
        }
    }



    async getTasks(userID){
        try{
            const result = await pool.query("SELECT text FROM userTasks WHERE user_id = $1 " , [userID])
            return result.rows
        }catch(error){
            console.error("Database error: " , error)
            throw new Error("Get tasks error: " + error.message)
        }
    }



    async deleteTask(text , userID){
        try{
            const result = await pool.query(`DELETE FROM userTasks WHERE text = $1 AND user_id = $2` , [ text , userID ])
            return {success: true}
        }catch(error){
            console.error("Database error: " , error)
            throw new Error("Delete task error: " + error.message)
        }
    }


    //generateToken for all
    async generateToken(user) {
        try{
            return jwt.sign(
                {id: user.id , email: user.email},
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                    algorithm: process.env.JWT_ALGORITHM,
                    issuer: process.env.JWT_ISSUER,
                    audience: process.env.JWT_AUDIENCE,
                }
            )
        }
        catch(error){
            console.log("JWT error: " , error)
            throw new Error("Error generating token: " + error.message)
        }
    }
}
module.exports = new UserService()