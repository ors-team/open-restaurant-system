import mysql from 'serverless-mysql';
require('dotenv').config()
export default async function testConnection(host: string, port: number, schema: string, user: string, password: string) {
    const db = mysql({
        config: {
            host: host,
            port: port,
            user: user,
            password: password,
            multipleStatements: false
        }
    });
    try {
        const results = await db.query("SELECT 'hello'");
        await db.end();
        return true;
    } catch (error) {
        return false;
    }
}