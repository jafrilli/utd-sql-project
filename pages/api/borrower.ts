import { isMissingBody, isMissingParams } from "@/lib/utils";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    switch(req.method) {
        case 'GET':
            await getBorrower(req, res)
            break;
        case 'POST':
            await postBorrower(req, res)
            break;
        default:
            res.status(400).json({ message: req.method + " is not a valid method." })
    }
}

const getBorrower = async (req: NextApiRequest, res: NextApiResponse) => {
    if(!isMissingParams(req, res, ["Card_id"])) {
        const { Card_id } = req.query
        // get borrower given card id
        const borrowers = await query(`
            SELECT * FROM BORROWER
            WHERE Card_id = ?;
        `, [ Card_id.toString() ])
        
        res.status(200).json(borrowers)
    }
}

const postBorrower = async (req: NextApiRequest, res: NextApiResponse) => {
    if(!isMissingBody(req, res, ["Bname", "Ssn", "Address", "Phone"])) {
        const { Bname, Ssn, Address, Phone } = req.query
        // get borrower given card id
        const borrowers = await query(`
            INSERT INTO BORROWER (Bname, Ssn, Address, Phone)
            VALUES (?, ?, ?, ?);
        `, [ 
            Bname.toString(), 
            parseInt(Ssn.toString().trim()), 
            Address.toString(), 
            parseInt(Phone.toString().trim()) ])
        
        res.status(200).json(borrowers)
    }
}

export default handler