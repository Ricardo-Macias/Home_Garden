import {
    searchForSensorByName,
    insertSensorData
} from "../database.js";

export async function sensorData(req, res){
    const {
        device_id,
        nombre,
        temperatura,
        humedadAmbiente,
        humedadSuelo,
        luz
    } = req.body;

    try {
        const id = await searchForSensorByName(nombre);
        const result = await insertSensorData(id, temperatura, humedadAmbiente, humedadSuelo, luz);
        
        res.json({
            message: "Si funciono" //Cambiar message
        });

    } catch(err){
        console.log("Error al registrar datos del sensor: ", err);
    }
}