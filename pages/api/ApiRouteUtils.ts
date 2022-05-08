import { NextApiRequest, NextApiResponse } from "next";

export function allowMethod(method: String, request: NextApiRequest, response: NextApiResponse): boolean {
    // todo enum with value
    if (request.method != method) {
        response.status(405).send("Method not allowed")
        return false
    } else {
        return true
    }
}