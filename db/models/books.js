/**
 *  CREATE TABLE BOOK (
        Isbn VARCHAR(10) NOT NULL,
        Title VARCHAR(255),
        PRIMARY KEY (Isbn)
    );
 */

module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define(
        "books",
        {
            isbn: {
                type: DataTypes.STRING,
                field: "Isbn",
                unique: true
            },
            title: {
                type: DataTypes.STRING,
                field: "Title",
            }
        },
        {
            tableName: "BOOK",
        }
    )

    books.associate = (models) => {
        books.belongsTo(models.bookAuthors, { as: 'book' })
    }
    return books
}