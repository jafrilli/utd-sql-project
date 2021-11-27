import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isMissingParams } from "lib/utils";
import sequelize from "../../db/";
import Fuse from "fuse.js";

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await search(req, res);
            break;
        default:
            res.status(400).json({
                messages: [req.method + " is not a valid method."],
            });
    }
};

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingParams(req, res, ["s", "page", "amount"])) {
        const { s, page, amount } = req.query;
        const results = await sequelize.models.Book.findAll({
            include: [
                {
                    model: sequelize.models.BookAuthor,
                    required: true,
                    include: sequelize.models.Author,
                    attributes: ["authorId"],
                },
            ],
        });

        const options = {
            keys: ["isbn", "title", "BookAuthors.Author.name"],
        };
        const fuse = new Fuse(results, options);
        const start =
            (parseInt(page.toString()) - 1) * parseInt(amount.toString());
        const end = parseInt(page.toString()) * parseInt(amount.toString());

        // manually format the results cuz sequelize being ass rn 
        // (constant time cuz we're only formatting 'amount' books)
        const books = fuse
            .search(s.toString())
            .slice(start, end)
            .map((b) => b.item as any)
            .map((b) => {
                return {
                    isbn: b.isbn,
                    title: b.title,
                    Authors: b.BookAuthors.map((ba) => {
                        return {
                            ...ba.Author.dataValues,
                        };
                    }),
                };
            });
        res.status(200).json(books);
    }
};

export default handler;
