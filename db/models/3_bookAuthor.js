/**
 *  CREATE TABLE BOOK_AUTHOR (
        Author_id INT NOT NULL,
        Isbn VARCHAR(10) NOT NULL,
        FOREIGN KEY (Author_id) REFERENCES AUTHOR(Author_id),
        FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn)
    );
 */

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class BookAuthor extends Model { }
    BookAuthor.init({
        authorId: {
            type: DataTypes.INTEGER,
            field: "Author_id",
            allowNull: false,
            references: {
                model: sequelize.models.Author,
                key: 'Author_id'
            }
        },
        isbn: {
            type: DataTypes.STRING(10),
            field: "Isbn",
            allowNull: false,
            references: {
                model: sequelize.models.Book,
                key: 'Isbn'
            }
        },
    }, { sequelize, timestamps: false })

    BookAuthor.belongsTo(sequelize.models.Book, { foreignKey: "Isbn" })
    BookAuthor.belongsTo(sequelize.models.Author, { foreignKey: "Author_id" })
    sequelize.models.Book.hasMany(BookAuthor, { foreignKey: 'Isbn' })
    sequelize.models.Author.hasMany(BookAuthor, { foreignKey: 'Author_id' })

    return BookAuthor
}