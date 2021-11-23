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
        const results = await sequelize.models.BookAuthor.findAll({
            attributes: [],
            include: [
                {
                    model: sequelize.models.Book,
                    required: true,
                },
                {
                    model: sequelize.models.Author,
                    required: true,
                },
            ],
        });

        const options = {
            keys: ["Book.isbn", "Book.title", "Author.name"],
        };
        const fuse = new Fuse(results, options);
        const start = (parseInt(page.toString())-1)*parseInt(amount.toString())
        const end = (parseInt(page.toString()))*parseInt(amount.toString())
        res.status(200).json(fuse.search(s.toString()).slice(start, end))
    }
};

export default handler;
