import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
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



// INSERTAR USUARIO: guarda contraseña cifrada
export async function insertUser(name, lastName, email, pass) {
    // genera hash con salt de 10 rondas
    const hashedPass = await bcrypt.hash(pass, 10);

    const [result] = await pool.query(
        `INSERT INTO usuario (nombre, apellidos, correo, pass) VALUES (?, ?, ?, ?)`,
        [name, lastName, email, hashedPass]
    );
    return result;
}

// LOGIN: compara contraseña ingresada con hash guardado
export async function findUserForLogin(email, pass) { 
    const [rows] = await pool.query(
        `SELECT * FROM usuario WHERE correo = ?`,
        [email]
    );

    if (!rows[0]) return false;

    // Compara contraseña ingresada con la cifrada
    const match = await bcrypt.compare(pass, rows[0].pass);

    return match ? { id: rows[0].id, nombre: rows[0].nombre, correo: rows[0].correo } : false;
}


// BUSCAR POR CORREO (para validar duplicados)
export async function findUserByCorreo(correo) {
    const [rows] = await pool.query(
        `SELECT * FROM usuario WHERE correo = ?`,
        [correo]
    );
    return rows.length > 0 ? rows[0] : null;
}

// OBTENER USUARIO POR ID
export async function getUserById(id) {
    const [rows] = await pool.query(
        `SELECT id, nombre, apellidos, correo FROM usuario WHERE id = ?`,
        [id]
    );
    return rows[0];
}

// ELIMINAR USUARIO
export async function deleteUser(id) {
    const [result] = await pool.query(
        `DELETE FROM usuario WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0; // true si se eliminó
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