import mysql from 'serverless-mysql';
require('dotenv').config()
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT || 3306,
        database: process.env.MYSQL_SCHEMA,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        multipleStatements: false
    }
});
export default async function executeQuery(query: string, values?: Array<any>) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}