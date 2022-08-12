import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from "dotenv"
config()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const required = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB']
  const missing: Array<string> = []
  for (let item of required) {
    if (typeof process.env[item] === 'undefined') {
      missing.push(item)
    }
  }

  if (missing.length) {
    res.status(200).json({ message: `Missing environment variables! ( ${required.join(', ')} )`, missing, success: false })
  } else {
    res.status(200).json({ message: 'Environment variables are configured correctly', missing, success: true })
  }
}
