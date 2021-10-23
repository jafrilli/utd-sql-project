import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { isMissingParams } from "@/lib/utils";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    switch(req.method) {
        case 'GET':
            await search(req, res)
            break;
        default:
            res.status(400).json({ message: req.method + " is not a valid method." })
    }
}

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    if(!isMissingParams(req, res, ["search"])) {
        const { search } = req.query
        // get borrower given card id
        const results = await query(`
            SELECT * FROM BOOK_AUTHOR ba
            LEFT JOIN AUTHOR a ON ba.Author_id = a.Author_id AND a.Name = ?
            RIGHT JOIN BOOK b ON ba.Isbn = b.Isbn AND (b.Title = ? OR b.Isbn = ?);
        `, [ search.toString(), search.toString(), search.toString() ])
        
        res.status(200).json(results)
    }
}

export default handler