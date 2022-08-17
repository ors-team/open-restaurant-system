import type { NextApiRequest, NextApiResponse } from 'next'
import testConnection from '../../components/mysql/test-conn'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { host, port, schema, user, password } = JSON.parse(req.body)
    res.status(200).json({ success: await testConnection(host, port, schema, user, password) })
}
