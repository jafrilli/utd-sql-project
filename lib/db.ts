import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host    : process.env.MYSQL_ENDPOINT,
        database: process.env.MYSQL_DATABASE,
        user    : process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port    : parseInt(process.env.MYSQL_PORT)
    }
})

export async function query(q: string, values: (string | number)[] | string | number = []) {
    try {
        const res = await db.query(q, values)
        await db.end()
        return res
    } catch(e) {
        Error(e)
    }
}