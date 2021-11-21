const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const db = {};

/* Custom handler for reading current working directory */
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
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(models, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// run the associations
Object.keys(db).forEach(model => {
    if (db[model].associate) {
        db[model].associate(db);
    }
});

db.query = async (q, values, queryType = "SELECT") => {
    try {
        const res = await sequelize.query(q, { replacements: values })
        return res
    } catch (e) {
        throw new Error(e)
    }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;