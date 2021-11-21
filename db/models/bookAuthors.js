/**
 *  CREATE TABLE BOOK_AUTHOR (
        Author_id INT NOT NULL,
        Isbn VARCHAR(10) NOT NULL,
        FOREIGN KEY (Author_id) REFERENCES AUTHOR(Author_id),
        FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn)
    );
 */

module.exports = (sequelize, DataTypes) => {
    const bookAuthors = sequelize.define(
        "bookAuthors",
        {
            authorId: {
                type: DataTypes.INTEGER,
                field: "Author_id", // Will result in an attribute that is firstName when user facing but first_name in the database
                unique: true
            },
            isbn: {
                type: DataTypes.STRING,
                field: "Isbn",
                unique: true
            },
        },
        {
            tableName: "BOOK_AUTHOR",
        }
    )

    bookAuthors.associate = (models) => {
        bookAuthors.hasOne(models.authors, { as: 'author' })
        bookAuthors.hasOne(models.books, { as: 'book' })
    }
    return bookAuthors
}