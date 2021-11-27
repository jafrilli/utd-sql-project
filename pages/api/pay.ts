import { isMissingBody, isMissingParams } from "lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "POST":
            await postPay(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const postPay = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMissingBody(req, res, ["loanIds"])) {
        const { loanIds } = req.body;
        const messages = [];
        try {
            const fines = []
            for(const loanId of loanIds) {
                // get fine for that loan, update to indicate it is paid
                let fine = await sequelize.models.Fine.findByPk(loanId.toString());

                if (!fine)
                    messages.push(`There is no fine linked to loan id ${loanId}`);
                if (messages.length > 0) {res.status(400).json({ messages }); return}

                else {
                    fine = await sequelize.models.Fine.update(
                        { paid: true },
                        { where: { loanId: loanId.toString() } }
                    );
                    fines.push(fine)
                }
            }
            res.status(200).json({ fines })
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
