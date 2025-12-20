import {
    insertGarden,
    getAllGarden
} from "../database.js";

// Agregar huerto
export async function allHomeVegetableGarden(req, res){
    try{
        const result = await getAllGarden();
        res.status(200).send(result);

    } catch(err){
        console.log("Error al mostrar los huertos: ", err)
    }
}

export async function addHomeVegetableGarden(req, res){
    const { 
        idSensorWifi,
        idCultivo,
        nombre,
        fechaInicio,
        fechaEstimada, 
        estado, 
        imagen } = req.body;

        try {
            const result = await insertGarden(idSensorWifi,
                idCultivo,
                nombre,
                fechaInicio,
                fechaEstimada,
                estado,
                imagen);

            res.json({
                message: "Si funciono",
            });
            
        }catch(err){
            console.log("Error al registrar huerto: ", err);
        };
}
