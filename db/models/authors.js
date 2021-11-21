/**
 *  CREATE TABLE AUTHOR (
        Author_id INT NOT NULL AUTO_INCREMENT,
        Name VARCHAR(255),
        PRIMARY KEY (Author_id),
        UNIQUE (Name)
    );
 */

module.exports = (sequelize, DataTypes) => {
    const authors = sequelize.define(
        "authors",
        {
            authorId: {
                type: DataTypes.INTEGER,
                field: "Author_id",
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                field: "Name",
                unique: true
            }
        },
        {
            tableName: "AUTHOR",
        }
    )

    authors.associate = (models) => {
        authors.belongsTo(models.bookAuthors, {as: 'author'})
    }
    return authors
}
