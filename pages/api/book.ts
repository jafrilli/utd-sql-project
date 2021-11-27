import { isMissingParams } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBook(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const getBook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingParams(req, res, ["isbn"])) {
        const { isbn } = req.query;
        // get borrower given card id
        const b = await sequelize.models.Book.findByPk(isbn.toString(), {
            include: [
                {
                    model: sequelize.models.BookAuthor,
                    required: true,
                    include: sequelize.models.Author,
                    attributes: ["authorId"],
                },
                {
                    model: sequelize.models.Loan,
                    required: false,
                    where: { dateIn: null },
                    attributes: { exclude: ["Isbn", "isbn"] },
                },
            ],
        });

        if (b)
            res.status(200).json({
                isbn: b.isbn,
                title: b.title,
                Authors: b.BookAuthors.map((ba) => {
                    return {
                        ...ba.Author.dataValues,
                    };
                }),
                Loans: b.Loans,
            });
        else
            res.status(400).json({
                messages: ["Unable to find book with isbn " + isbn],
            });
    }
};

export default handler;
