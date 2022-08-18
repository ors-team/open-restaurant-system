import type { NextApiRequest, NextApiResponse } from 'next'
import setEnv from '../../../components/env'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const rb = JSON.parse(req.body)
        for (let item of Object.keys(rb)) {
            setEnv(`R_${item.toUpperCase()}`, rb[item])
        }
        setEnv("SETUP_FINISHED", "true")
        res.status(200).json({ success: true })
    } catch {
        res.status(200).json({ success: false })
    }
}
