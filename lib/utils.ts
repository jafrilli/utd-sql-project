import { NextApiRequest, NextApiResponse } from "next"


export function isMissingBody(req: NextApiRequest, res: NextApiResponse, required: string[]): boolean {
    const query = Object.keys(req.body)
    const missing = []

    required.forEach(r => {
        if(!query.includes(r)) {
            missing.push(r)
        }
    })
    
    res.status(400).json({
        missing,
        message: "You have not provided the following the request body: " + missing.join(", ")
    })

    return missing.length != 0
}

export function isMissingParams(req: NextApiRequest, res: NextApiResponse, required: string[]): boolean {
    const query = Object.keys(req.query)
    const missing = []

    required.forEach(r => {
        if(!query.includes(r)) {
            missing.push(r)
        }
    })
    
    res.status(400).json({
        missing,
        message: "You have not provided the following the query parameters: " + missing.join(", ")
    })

    return missing.length != 0
}