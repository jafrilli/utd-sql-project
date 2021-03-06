/**
 *  CREATE TABLE FINES (
        Loan_id INT NOT NULL,
        Fine_amt FLOAT(100, 2) NOT NULL,
        Paid BOOLEAN NOT NULL,
        PRIMARY KEY (Loan_id),
        FOREIGN KEY (Loan_id) REFERENCES BOOK_LOAN(Loan_id)
    );
 */

const { Model, DataTypes, Op } = require('sequelize')

module.exports = (sequelize) => {
    class Fine extends Model {}
    Fine.init({
        loanId: {
            type: DataTypes.INTEGER,
            field: "Loan_id",
            allowNull: false,
            primaryKey: true,
            references: {
                model: sequelize.models.Loan,
                key: "Loan_id"
            }
        },
        amount: {
            type: DataTypes.FLOAT(100, 2),
            field: "Fine_amt",
            allowNull: false,
            defaultValue: 0.00,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            field: "Paid",
            allowNull: false,
            defaultValue: false
        }
    }, { sequelize, timestamps: false })

    Fine.belongsTo(sequelize.models.Loan, {foreignKey: "Loan_id"})
    sequelize.models.Loan.hasOne(Fine, {foreignKey: "Loan_id"})

    return Fine
}