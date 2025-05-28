const express = require("express");
const app = express()
const { Pool } = require("pg")
const cors = require("cors")
require("dotenv").config()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials: true,
}))
app.use(express.json())

const SERVER_PORT = 8080

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    idleTimeoutMillis: 20000,
    max:10
})

const checkDataBaseConnection = async () => {
    const client = await pool.connect()
    try{
        const result = await client.query("SELECT NOW()")
        console.log("Connection was successful: " , result.rows[0].now)
        return true
    }
    catch(error){
        console.log("Connection was not successful: " , error)
        return false
    }
    finally{
        client.release()
    }
}

const MainRouters = require("./route/api")
app.use("/api" , MainRouters)

const startServer = async () => {
    const result = await checkDataBaseConnection()
    if(result){
        app.listen(SERVER_PORT , () => {
            console.log(`Server started: http://localhost:${SERVER_PORT}`)
        })
    }
    else{
        process.exit(1)
    }
}

startServer()
module.exports = pool;