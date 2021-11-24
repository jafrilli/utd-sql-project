import { isMissingParams } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getFine(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const getFine = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingParams(req, res, ["cardId"])) {
        const { cardId } = req.query;
        try {
            // get all active Loans linked to the list of isbns provided
            const fine = await sequelize.models.Fine.getTotalUnpaidFines(cardId.toString())
            res.status(200).json({fine})
        } catch (e) {
            console.log(e);
            res.status(400).json({
                messages: (e.errors ?? []).map((e) => e.message),
            });
        }
    }
};

export default handler;
