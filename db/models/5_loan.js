/**
 *  CREATE TABLE BOOK_LOAN (
        Loan_id INT NOT NULL AUTO_INCREMENT,
        Isbn VARCHAR(10) NOT NULL,
        Card_id VARCHAR(8) NOT NULL,
        Date_out DATE NOT NULL,
        Due_date DATE NOT NULL,
        Date_in DATE,
        PRIMARY KEY (Loan_id),
        FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn),
        FOREIGN KEY (Card_id) REFERENCES BORROWER(Card_id)
    );
 */
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Loan extends Model {}
    Loan.init({
        loanId: {
            type: DataTypes.INTEGER,
            field: "Loan_id",
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        isbn: {
            type: DataTypes.STRING(10),
            field: "Isbn",
            allowNull: false,
            references: {
                model: sequelize.models.Book,
                key: "Isbn"
            }
        },
        cardId: {
            type: DataTypes.STRING(8),
            field: "Card_id",
            allowNull: false,
            references: {
                model: sequelize.models.Borrower,
                key: "Card_id"
            }
        },
        dateOut: {
            type: DataTypes.DATE,
            field: "Date_out",
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            field: "Due_date",
            allowNull: false
        },
        dateIn: {
            type: DataTypes.DATE,
            field: "Date_in",
        }
    }, { sequelize, timestamps: false })

    return Loan
}