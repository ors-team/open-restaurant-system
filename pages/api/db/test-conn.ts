import type { NextApiRequest, NextApiResponse } from 'next'
import testConnection from '../../../components/mysql/test-db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { host, port, schema, user, password } = JSON.parse(req.body)
    const test = await testConnection(host, port, schema, user, password)
    res.status(200).json({ success: test[0], schemaAvailable: test[1] })
}
