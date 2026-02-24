import { getCropRanges } from "../database.js";

export const checkSensorRanges = async (req, res) => {
    const { nombreCultivo, sensorData } = req.body;
    try {
        const ranges = await getCropRanges(nombreCultivo);
        if (!ranges) return res.status(404).json({ error: "Cultivo no encontrado" });

        const checkRange = (value, min, max) => value >= min && value <= max;

        const result = {
            temperatura: {
                valor: sensorData.temp,
                estado: checkRange(sensorData.temp, ranges.temperatura_min, ranges.temperatura_max) ? "ok" : "fuera",
                min: ranges.temperatura_min,
                max: ranges.temperatura_max
            },
            humedadSuelo: {
                valor: sensorData.humedadSuelo,
                estado: checkRange(sensorData.humedadSuelo, ranges.humedadSuelo_min, ranges.humedadSuelo_max) ? "ok" : "fuera",
                min: ranges.humedadSuelo_min,
                max: ranges.humedadSuelo_max
            },
            humedadAmbiente: {
                valor: sensorData.humedadAmbiente,
                estado: checkRange(sensorData.humedadAmbiente, ranges.humedadAmbiental_min, ranges.humedadAmbiental_max) ? "ok" : "fuera",
                min: ranges.humedadAmbiental_min,
                max: ranges.humedadAmbiental_max
            },
            luz: {
                valor: sensorData.luz,
                estado: checkRange(sensorData.luz, ranges.luz_min, ranges.luz_max) ? "ok" : "fuera",
                min: ranges.luz_min,
                max: ranges.luz_max
            }
        };

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor" });
    }
};