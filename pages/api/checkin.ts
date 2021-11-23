import { isMissingBody } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "POST":
            await postCheckin(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const postCheckin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingBody(req, res, ["cardId", "isbns"])) {
        const { cardId, isbns } = req.body;
        const messages = [];
        try {
            // get all active Loans linked to the list of isbns provided
            const isbnList = isbns.map((i) => i.toString());
            const loans = await sequelize.models.Loan.update(
                { dateIn: new Date() },
                {
                    where: {
                        cardId: cardId.toString(),
                        isbn: { [Op.in]: isbnList },
                        dateIn: null,
                    },
                }
            );
            res.status(200).json(loans)
        } catch (e) {
            console.log(e);
            res.status(400).json({
                messages: [
                    ...messages,
                    ...(e.errors ?? []).map((e) => e.message),
                ],
            });
        }
    }
};

export default handler;
