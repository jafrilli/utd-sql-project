/**
 *  CREATE TABLE AUTHOR (
        Author_id INT NOT NULL AUTO_INCREMENT,
        Name VARCHAR(255),
        PRIMARY KEY (Author_id),
        UNIQUE (Name)
    );
 */

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Author extends Model {}
    Author.init({
        authorId: {
            type: DataTypes.INTEGER,
            field: "Author_id",
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: "Name",
            allowNull: false,
            unique: true,
        },
    }, { sequelize, timestamps: false })

    return Author
}