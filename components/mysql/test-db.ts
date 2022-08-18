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
        const results = await db.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [schema]);
        await db.end();
        return [true, results.length === 0];
    } catch (error) {
        return [false, false];
    }
}