import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

export async function getUserByID(id) {
    const [row] = await pool.query(
        `SELECT * FROM usuario WHERE id = ?`,
        [id]
    )
   return row[0];
}

// AGREGAR LAS CONSULTAS