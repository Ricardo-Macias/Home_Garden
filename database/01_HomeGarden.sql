CREATE TABLE usuario (
	id SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellidos VARCHAR(180) NOT NULL,
    correo VARCHAR(180) NOT NULL UNIQUE,
    pass VARCHAR(80) NOT NULL,
    imagen VARCHAR(180)
);

CREATE TABLE cultivo (
	id SERIAL PRIMARY KEY,
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

CREATE TABLE sensor (
    "idSensor" SERIAL PRIMARY KEY,
    "idUsuario" INT NOT NULL,
    "deviceName" VARCHAR(20) NOT NULL,
    FOREIGN KEY("idUsuario") REFERENCES usuario(id)
);

CREATE TABLE huerto (
    "idHuerto" SERIAL PRIMARY KEY,
    "idSensor" INT NOT NULL,
    "idCultivo" INT NOT NULL,
    nombre VARCHAR(80),
    estado BOOLEAN,
    imagen VARCHAR(180),
    "fechaInicio" DATE NOT NULL,
    "fechaEstimada" DATE,
    "fechaFin" DATE,
    FOREIGN KEY("idSensor") REFERENCES sensor("idSensor"),
    FOREIGN KEY("idCultivo") REFERENCES cultivo(id)
);

CREATE TABLE sensor_data (
    "idSensorData" SERIAL PRIMARY KEY,
    "idSensor" INT NOT NULL,
    temperatura FLOAT NOT NULL,
    "humedadAmbiente" FLOAT NOT NULL,
    "humedadSuelo" FLOAT NOT NULL,
    luz CHAR(10) NOT NULL,
    fecha DATE DEFAULT(CURRENT_DATE),
    hora TIME DEFAULT(CURRENT_TIME),
    FOREIGN KEY("idSensor") REFERENCES sensor("idSensor")
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    cultivo_id INT NOT NULL,
    fecha_agregado DATE DEFAULT(CURRENT_DATE),
    FOREIGN KEY(usuario_id) REFERENCES usuario(id),
    FOREIGN KEY(cultivo_id) REFERENCES cultivo(id)
);