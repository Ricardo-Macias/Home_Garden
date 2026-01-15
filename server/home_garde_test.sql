CREATE DATABASE IF NOT EXISTS home_garden;

USE home_garden;

CREATE TABLE IF NOT EXISTS usuario (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellidos VARCHAR(180) NOT NULL,
    correo VARCHAR(180) NOT NULL UNIQUE,
    pass VARCHAR(80) NOT NULL,
    imagen VARCHAR(180)
);

CREATE TABLE IF NOT EXISTS cultivo (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(180) NOT NULL,
    tipo VARCHAR(80) NOT NULL,
    dificultad CHAR(10) NOT NULL,
    duracion INT NOT NULL,
    descripcion VARCHAR(280) NOT NULL,
    consejos VARCHAR(280) NOT NULL
);

CREATE TABLE IF NOT EXISTS sensor(
    idSensor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    ip VARCHAR(15) NOT NULL,
    FOREIGN KEY(idUsuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS huerto (
	idHuerto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idSensor INT NOT NULL,
    idCultivo INT NOT NULL,
    nombre VARCHAR(80),
    estado BOOLEAN,
    imagen VARCHAR(180),
    fechaInicio DATE NOT NULL,
    fechaEstimada DATE,
    fechaFin DATE,
    FOREIGN KEY(idSensor) REFERENCES sensor(idSensor),
    FOREIGN KEY(idCultivo) REFERENCES cultivo(id)
);

/*
    VISTAS
*/

CREATE VIEW vw_home AS
    SELECT 
    u.id AS usuario,
    s.idSensor AS sensor,
    h.nombre AS huerto,
    c.nombre AS cultivo,
    h.imagen AS imagen,
    h.fechaInicio AS inicio,
    h.fechaEstimada AS termina
    FROM huerto h
    JOIN cultivo c ON h.idCultivo = c.id
    JOIN sensor s ON h.idSensor = s.idSensor
    JOIN USUARIO u ON u.id = s.idUsuario
    AND estado = 0;


CREATE VIEW vsta_historial_huerto AS
    SELECT 
        h.imagen AS imagen,
        h.nombre AS huerto,
        c.nombre AS cultivo,
        h.fechaInicio AS inicio,
        h.fechaEstimada AS estimada,
        c.dificultad AS dificultad,
        c.tipo AS tipo,
        c.duracion AS duracion
    FROM huerto h
    JOIN cultivo c ON h.idCultivo = c.id
    WHERE h.estado = 1;