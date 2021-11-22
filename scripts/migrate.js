const sequelize = require('../db')

module.exports.migrate = async () => {
    try {
        await sequelize.sync()
        console.log("Successfully migrated database!")
    } catch (e) {
        console.error("Unable to create the necessary tables in the database.")
        console.error(e)
        process.exit(1)
    }
}
