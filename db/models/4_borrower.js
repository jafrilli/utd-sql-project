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
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Borrower extends Model {}
    Borrower.init({
        borrowerId: {
            type: DataTypes.INTEGER,
            field: "Borrower_id",
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        cardId: {
            type: DataTypes.STRING(8),
            field: "Card_id",
            unique: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: "Bname",
            allowNull: false
        },
        ssn: {
            type: DataTypes.CHAR(9),
            field: "Ssn",
            allowNull: false
        },
        phone: {
            type: DataTypes.CHAR(10),
            field: "Phone",
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            field: "Address",
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        hooks: {
            beforeCreate: (borrower) => {
                // remove all the non-numerical characters
                borrower.ssn = borrower.ssn.replace(/\D/g, '')
                borrower.phone = borrower.phone.replace(/\D/g, '')
            },
            afterCreate: (borrower) => {
                return borrower.update({
                    cardId: "ID" + borrower.borrowerId.toString().padStart(6, '0')
                })
            }
        }
    })

    return Borrower
}