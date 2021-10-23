const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

require('dotenv').config({ path: envPath })

const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
})

module.exports.query = async (q, values) => {
    try {
        const res = await (await connection).execute(q, values)
        return res
    } catch (e) {
        Error(e)
    }
}
