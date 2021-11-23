const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const models = process.cwd() + '/db/models/' || __dirname;

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        dialect: 'mysql',
        logging: false
    }
)

// import the models into sequelize, add them to db object
fs.readdirSync(models)
    .filter(file => (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'))
    .forEach(file => require("./models/" + file)(sequelize))

module.exports = sequelize;