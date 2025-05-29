const { Pool } = require("pg")
require("dotenv").config();

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

module.exports = {
    pool ,
    checkDataBaseConnection
}