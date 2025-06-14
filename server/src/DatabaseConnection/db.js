require("dotenv").config({ path: '../.env' })
const { Pool } = require("pg")

// убрал .env поскольку были проблемы при деплое с докером, поэтому пришлось писать все сдесь((
const pool = new Pool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    idleTimeoutMillis: 20000,
    max: 10,
    connectionTimeoutMillis: 5000
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