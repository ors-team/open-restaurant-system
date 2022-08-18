import mysql from 'serverless-mysql';
require('dotenv').config()
export default async function generateSchema(host: string, port: number, schema: string, user: string, password: string) {
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
        await db.query("CREATE DATABASE IF NOT EXISTS `" + schema + "`;");
        await db.end();
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}