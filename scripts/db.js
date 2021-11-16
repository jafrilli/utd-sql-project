const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

require('dotenv').config({ path: envPath })

// const mysql = require('mysql2/promise')
const Sequelize = require('sequelize')

const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        logging: false
    }
)

// const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD,
//     port: process.env.MYSQL_PORT,
// })

module.exports.query = async (q, values) => {
    try {
        const res = await connection.query(q, {replacements: values})
        return res
    } catch (e) {
        throw new Error(e)
    }
}
