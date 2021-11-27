import { NextApiRequest, NextApiResponse } from "next"

export const fetcher = url => fetch(url).then(res => res.json())

export const CARD_ID = "cardId"

export function isMissingBody(req: NextApiRequest, res: NextApiResponse, required: string[]): boolean {
    const query = Object.keys(req.body)
    const missing = []

    required.forEach(r => {
        if(!query.includes(r)) {
            missing.push(r)
        }
    })
    
    if (missing.length > 0) {
        res.status(400).json({
            missing,
            messages: ["You have not provided the following the request body: " + missing.join(", ")]
        })
    }

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
    
    if (missing.length > 0) {
        res.status(400).json({
            missing,
            messages: ["You have not provided the following the query parameters: " + missing.join(", ")]
        })
    }

    return missing.length != 0
}