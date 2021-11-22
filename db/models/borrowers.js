/**
 *  CREATE TABLE BORROWER (
        Card_id VARCHAR(8) NOT NULL,
        Bname VARCHAR(255) NOT NULL,
        Ssn INT NOT NULL,
        Address VARCHAR(255) NOT NULL,
        Phone CHAR(10) NOT NULL,
        PRIMARY KEY (Card_id)
    );
 */

module.exports = (sequelize, DataTypes) => {
    const borrowers = sequelize.define(
        "borrowers",
        {
            cardId: {
                type: DataTypes.STRING,
                field: "Card_id", // Will result in an attribute that is firstName when user facing but first_name in the database
            },
            name: {
                type: DataTypes.STRING,
                field: "Bname",
            },
            ssn: {
                type: DataTypes.INTEGER,
                field: "Ssn",
            },
            phone: {
                type: DataTypes.STRING,
                field: "Phone",
            },
            address: {
                type: DataTypes.STRING,
                field: "Address",
            }
        },
        {
            hooks: {
                beforeCreate: (borrower, options) => {
                    // remove all the non-numerical characters
                    borrower.ssn = borrower.ssn.replace(/\D/g, '')
                    borrower.phone = borrower.phone.replace(/\D/g, '')
                },
            },
            tableName: "BORROWER",
        }
    )
    console.log(borrowers)
    borrowers.associate = (models) => {

    }
    return borrowers
}