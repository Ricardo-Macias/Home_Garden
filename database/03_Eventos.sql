/*SET GLOBAL event_scheduler = ON;

USE home_garden;

CREATE EVENT IF NOT EXISTS marcar_huertos_finalizados
ON SCHEDULE EVERY 1 DAY
DO
    UPDATE huerto
    SET estado = 1, "fechaFin" = CURRENT_DATE
    WHERE "fechaEstimada" IS NOT NULL
    AND "fechaEstimada" <= CURRENT_DATE
    AND estado = 0;
*/