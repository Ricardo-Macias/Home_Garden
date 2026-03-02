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
    consejos VARCHAR(280) NOT NULL,
    humedadAmbiental_min FLOAT NOT NULL,
    humedadAmbiental_max FLOAT NOT NULL,
    humedadSuelo_min FLOAT NOT NULL,
    humedadSuelo_max FLOAT NOT NULL,
    temperatura_min FLOAT NOT NULL,
    temperatura_max FLOAT NOT NULL,
    luz_min FLOAT NOT NULL,
    luz_max FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS sensor(
    idSensor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    deviceName VARCHAR(20) NOT NULL,
    FOREIGN KEY(idUsuario) REFERENCES usuario(id),
);

CREATE TABLE IF NOT EXISTS huerto (
    idHuerto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idSensor INT NOT NULL,
    idCultivo INT NOT NULL,
    nombre VARCHAR(80),
    estado BOOLEAN,
    fechaInicio DATE NOT NULL,
    fechaEstimada DATE,
    fechaFin DATE,
    FOREIGN KEY(idSensor) REFERENCES sensor(idSensor),
    FOREIGN KEY(idCultivo) REFERENCES cultivo(id)
);

CREATE TABLE IF NOT EXISTS huerto_imagen (
    idImagen INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idHuerto INT NOT NULL,
    rutaImagen VARCHAR(180) NOT NULL,
    fechaCaptura DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(idHuerto) REFERENCES huerto(idHuerto)
);


CREATE TABLE IF NOT EXISTS sensor_data(
    idSensorData INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idSensor INT NOT NULL,
    temperatura FLOAT NOT NULL,
    humedadAmbiente FLOAT NOT NULL,
    humedadSuelo FLOAT NOT NULL,
    luz CHAR(10) NOT NULL,
    fecha DATE DEFAULT CURDATE(),
    hora TIME DEFAULT CURTIME(),
    FOREIGN KEY(idSensor) REFERENCES sensor(idSensor)
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

CREATE VIEW vista_historial_huertos AS
    SELECT
        u.id AS idUsuario,
        h.idHuerto AS idHuerto,
        h.nombre AS huerto,
        c.nombre AS cultivo,
        c.tipo AS tipo,
        c.dificultad AS dificultad,
        c.duracion AS duracion
        h.imagen AS imagen,
        h.fechaInicio AS fechaInicio,
        h.fechaEstimada AS fechaFin
    FROM huerto h
    JOIN sensor s ON h.idSensor = s.idSensor
    JOIN usuario u ON s.idUsuario = u.id
    JOIN cultivo c ON h.idCultivo = c.id
    WHERE h.estado = 1;