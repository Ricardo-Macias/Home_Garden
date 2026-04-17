/*SELECT cron.schedule(
    'marcar_huertos_finalizados',
    '0 0 * * *',
    $$UPDATE huerto
        SET estado = 1, "fechaFin" = CURRENT_DATE
        WHERE "fechaEstimada" IS NOT NULL
        AND "fechaEstimada" <= CURRENT_DATE
        AND estado = 0;$$
);
*/