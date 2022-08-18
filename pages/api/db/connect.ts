import type { NextApiRequest, NextApiResponse } from 'next'
import setEnv from '../../../components/env'
import generateSchema from '../../../components/mysql/generate-schema'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return new Promise(async (resolve, reject) => {
        try {
            const rb = JSON.parse(req.body)
            const resp = await generateSchema(rb.host, rb.port, rb.schema, rb.user, rb.password)
            if (resp) {
                for (let item of Object.keys(rb)) {
                    setEnv(`MYSQL_${item.toUpperCase()}`, rb[item])
                }
            }
            resolve(res.status(200).json({ success: resp }))
        } catch {
            resolve(res.status(200).json({ success: false }))
        }
    })
}
