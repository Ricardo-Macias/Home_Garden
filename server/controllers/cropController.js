import {
    insertGarden,
    insertSensor,
    getAllGarden
} from "../database.js";

// Agregar sensor

export async function addSensor(req, res){
    const {
        idUsuario,
        ip
    } = req.body;

    try {
        const result = await insertSensor(idUsuario, ip);

        res.json({
            idSensor: result
        });
    } catch (err) {
        console.log("Error al registrar sensor: ", err);
    }
}

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
        idSensor,
        idCultivo,
        nombre,
        fechaInicio,
        fechaEstimada, 
        estado, 
        imagen } = req.body;

        try {
            const result = await insertGarden(idSensor,
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
