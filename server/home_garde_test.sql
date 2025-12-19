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
    nombre VARCHAR(180),
    serviceUuid VARCHAR(36),
    ssidCharUuid VARCHAR(36),
    passCharUuid VARCHAR(36)
);

CREATE TABLE IF NOT EXISTS sensorWifi(
    idSensorWifi INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idSensor INT NOT NULL,
    ip VARCHAR(15) NOT NULL,
    FOREIGN KEY(idUsuario) REFERENCES usuario(id),
    FOREIGN KEY(idSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE IF NOT EXISTS huerto (
	idHuerto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idSensorWifi INT NOT NULL,
    idCultivo INT NOT NULL,
    nombre VARCHAR(80),
    estado BOOLEAN,
    imagen VARCHAR(180),
    fechaInicio DATE NOT NULL,
    fechaEstimada DATE,
    fechaFin DATE,
    FOREIGN KEY(idSensorWifi) REFERENCES sensorWifi(idSensorWifi),
    FOREIGN KEY(idCultivo) REFERENCES cultivo(id)
);
