import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const sequelize = require("../../db/index");

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            await getDaily(req, res);
            break;
        default:
            res.status(400).json({
                messages: [
                    req.method + " is not a valid method for this endpoint.",
                ],
            });
    }
};

const getDaily = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // get all active loans
        const loans = await sequelize.models.Loan.findAll({
            where: { dateIn: null },
            include: [
                {
                    model: sequelize.models.Fine,
                },
            ],
        });
        // for every active loan, update fine
        for (const loan of loans) {
            // if its past due date, run the fine subroutine
            if ((loan.dueDate as Date) < new Date()) {
                // get fine, if doesnt exist, create it
                if (!loan.Fine)
                    await sequelize.models.Fine.create({ loanId: loan.loanId });
                // if a fine has been paid but book not returned, reset the count
                else if (loan.Fine.paid) {
                    await sequelize.models.Fine.update(
                        { amount: 0, paid: false },
                        { where: { loanId: loan.loanId } }
                    );
                }
                // update fine
                await sequelize.models.Fine.update(
                    { amount: sequelize.literal("Fine_amt + 0.25") },
                    { where: { loanId: loan.loanId } }
                );
            }
        }
        res.status(200).json({ success: true });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            messages: [...(e.errors ?? []).map((e) => e.message)],
        });
    }
};

export default handler;
