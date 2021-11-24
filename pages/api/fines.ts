import { isMissingParams } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getFines(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const getFines = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingParams(req, res, ["cardId"])) {
        const { cardId } = req.query;
        try {
            const loans = await sequelize.models.Loan.findAll({
                where: { cardId: cardId.toString() },
                attributes: ["dueDate", "dateIn", "dateOut"],
                include: [
                    {
                        model: sequelize.models.Book,
                        required: true,
                    },
                    {
                        model: sequelize.models.Fine,
                        where: { paid: false },
                        required: true,
                    },
                ],
            });
            res.status(200).json(loans);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                messages: (e.errors ?? []).map((e) => e.message),
            });
        }
    }
};

export default handler;
