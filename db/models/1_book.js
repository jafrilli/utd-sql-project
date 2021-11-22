/**
 *  CREATE TABLE BOOK (
        Isbn VARCHAR(10) NOT NULL,
        Title VARCHAR(255),
        PRIMARY KEY (Isbn)
    );
 */

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Book extends Model {}
    Book.init({
        isbn: {
            type: DataTypes.STRING(10),
            field: "Isbn",
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            field: "Title",
        },
    }, { sequelize, timestamps: false });

    return Book
}