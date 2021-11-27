import { isMissingBody, isMissingParams } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBorrower(req, res);
            break;
        case "POST":
            await postBorrower(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const getBorrower = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingParams(req, res, ["cardId"])) {
        const { cardId } = req.query;
        // get borrower given card id
        const borrower = await sequelize.models.Borrower.findOne({
            where: { cardId: cardId.toString() },
        });

        if (borrower) res.status(200).json(borrower);
        else
            res.status(400).json({
                messages: ["Unable to find borrower with cardId " + cardId],
            });
    }
};

const postBorrower = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingBody(req, res, ["name", "ssn", "address", "phone"])) {
        const { name, ssn, address, phone } = req.body;
        // get borrower given card id
        try {
            const borrower = await sequelize.models.Borrower.create({
                name: name.toString(),
                ssn: ssn.toString(),
                phone: phone.toString(),
                address: address.toString(),
            });
            res.status(200).json(borrower);
        } catch (e) {
            const messages = (e.errors ?? []).map((e) => e.message);
            if (e.original) messages.push(e.original.sqlMessage);
            res.status(400).json({ messages });
        }
    }
};

export default handler;
