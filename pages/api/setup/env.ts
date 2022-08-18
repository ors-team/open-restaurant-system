import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from "dotenv"
config()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const required = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_SCHEMA', 'R_NAME', 'R_CURRENCY', 'SETUP_FINISHED']
  const missing: Array<string> = []
  for (let item of required) {
    if (typeof process.env[item] === 'undefined') {
      missing.push(item)
    }
  }
  res.status(200).json({ missing, success: !missing.length })
}
