const express = require("express");
const { checkDataBaseConnection , pool } = require("./DatabaseConnection/db.js")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

const SERVER_PORT = 8080

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