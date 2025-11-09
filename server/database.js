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

/*
 *  Consultas en la tabla usuario
*/

export async function login(email, pass) {
    const [result] = await pool.query(
        `SELECT * FROM usuario WHERE correo = ?`,
        [email]
    );

    return result[0]['pass'] == pass ? result[0] : false;
}

export async function insertUser(name, lastName, email, pass) {
    const [result] = await pool.query(
        `INSERT INTO (nombre, apellidos, correo, pass) VALUES (?, ?, ?, ?)`,
        [name, lastName, email, pass]
    );

    return result
}

export async function deleteUser(id) {
    const [result] = await pool.query(
        `DELETE FROM usuario WHERE id = ?`,
        [id]
    );
}

export async function updateUser(email, pass) {
    const [result] = await pool.query(
        `UPDATE usuario SET correo = ?, pass = ?`,
        [email, pass]
    );
    return result
}

/*
 *  Consultas en la tabla sensor 
*/

export async function getSensors(idUsuario) {
    const [row] = await pool.query(
        `SELECT * FROM sensor WHERE idUsuario = ?`,
        [idUsuario]
    );
    return row;
}

export async function insertSensor(idUsuario, name) {
    const [result] = await pool.query(
        `INSERT INTO sensor (idUsuario, nombre) VALUES (?, ?)`,
        [idUsuario, name]
    );
    //const sensorID = result.insertId;
    return result;
}

export async function deleteSensor(id) {
    const [result] = await pool.query(
        `DELETE FROM sensor WHERE id = ?`,
        [id]
    );
    return result;
}

export async function updateSensor(id, name) {
    const [result] = await pool.query(
        `UPDATE sensor SET nombre = ? WHERE id = ?`,
        [name, id]
    );
    return result;
}

/*
 *  Consultas en la tabla huerto
*/

export async function getGarden(idSensor) {
    const [row] = await pool.query(
        `SELECT * FROM huerto WHERE idSensor = ?`,
        [idSensor]
    );
    return row[0];
}

export async function insertGarden(idSensor, idCrop) {
    const [result] = await pool.query(
        `INSERT INTO huerto (idSensor, idCultivo, fechaInicio, fechaEstimada) 
        VALUE (?, ?, ?, ?)`,
        [idSensor, idCrop]

    );
    return result;
}

export async function deleteGarden(id) {
    const [result] = await pool.query(
        `DELETE FROM huerto WHERE id = ?`,
        [id]
    );
    return result;
}

export async function updateGarden(id, idCrop) {
    const [result] = await pool.query(
        `UPDATE huerto SET idCrop = ? WHERE id = ?`,
        [idCrop, id]
    );
    return result
}

/*
 *  Consultas en la tabla cultivo
*/

export async function getAllCrop() {
    const [row] = await pool.query(
        `SELECT * FROM cultivo`
    );

    return row;
}

export async function insertCrop(name, kind, difficult, description, tips) {
    const [result] = await pool.query(
        `INSERT INTO huerto (nombre, tipo, dificultad, descripcion, consejos)
        VALUES (?, ?, ?, ?, ?)`,
        [name, kind, difficult, description, tips]
    );

    return result;
}

export async function searchCrop(name) {
    conts[result] = await pool.query(
        `SELECT * FROM cultivo WHERE nombre = ?`,
        [name]
    );

    return result;
}