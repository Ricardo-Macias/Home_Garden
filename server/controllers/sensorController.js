import {
    searchForSensorByName,
    insertSensorData
} from "../database.js";

export async function sensorData(req, res){
    const {
        device_id,
        temperatura,
        humedadAmbiente,
        humedadSuelo,
        luz
    } = req.body;

    try {
        
        const result = await insertSensorData(device_id, 
            temperatura,
            humedadAmbiente,
            humedadSuelo,
            luz);
        
        res.json({
            message: result
        });

    } catch(err){
        console.log("Error al registrar datos del sensor: ", err);
    }
}