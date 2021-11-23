import { isMissingBody } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require('../../db/index')

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "POST":
            await postCheckout(req, res);
            break;
        default:
            res.status(400).json({
                messages:
                    [req.method + " is not a valid method for this endpoint."],
            });
    }
};

const postCheckout = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingBody(req, res, ["cardId", "isbn"])) {
        const { cardId, isbn } = req.body;
        const messages = []
        const maxBooks = 3
        const daysDue = 14
        try {
            // check if book exists
            const book = await sequelize.models.Book.findByPk(isbn.toString())
            if (!book) messages.push(`Book with ISBN ${isbn} not found.`)
            // check if book is being loaned
            const bookLoans = await sequelize.models.Loan.getActiveBookLoans(isbn.toString());
            if (bookLoans.length > 0) messages.push(`Book with ISBN ${isbn} not currently available.`)
            // check if person is already loaning 3 books
            const borrowerLoans = await sequelize.models.Loan.getActiveBorrowerLoans(cardId.toString());
            if (borrowerLoans.length >= maxBooks) messages.push(`You are already borrowing ${maxBooks} or more books.`)
            
            if (messages.length > 0) res.status(400).json({ messages })
            else {
                // create a new loan
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + daysDue);
                
                const loan = await sequelize.models.Loan.create({
                    cardId: cardId.toString(),
                    isbn: isbn.toString(),
                    dateOut: new Date(),
                    dueDate
                })
                res.status(200).json(loan);
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ messages: [...messages, ...(e.errors ?? []).map(e => e.message)] })
        }
    }
};

export default handler;
