
CREATE VIEW vw_home AS SELECT 
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
    JOIN usuario u ON u.id = s.idUsuario
    WHERE h.estado = 0;

CREATE VIEW vista_historial_huertos AS SELECT
        u.id AS idUsuario,
        h.idHuerto AS idHuerto,
        h.nombre AS huerto,
        c.nombre AS cultivo,
        c.tipo AS tipo,
        c.dificultad AS dificultad,
        c.duracion AS duracion,
        h.imagen AS imagen,
        h.fechaInicio AS fechaInicio,
        h.fechaEstimada AS fechaFin
    FROM huerto h
    JOIN sensor s ON h.idSensor = s.idSensor
    JOIN usuario u ON s.idUsuario = u.id
    JOIN cultivo c ON h.idCultivo = c.id
    WHERE h.estado = 1;

CREATE VIEW vw_historialRegado AS SELECT
    u.id AS idUsuario,
    h.idHuerto AS idHuerto,
    r.idRiego AS idRiego,
    s.idSensor AS idSensor,
    s.nombre AS sensor
    FROM huerto h
    JOIN sensor s ON h.idSensor = s.idSensor
    JOIN usuario u ON s.idUsuario = u.id
    JOIN historial_regado r ON r.idHuerto = h.idHuerto;