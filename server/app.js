import express from "express";
import {
    getSensors,
} from "./database.js";
import cors from 'cors';

const corsOptions = {
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET"],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// PRUEBA
app.get("/sensor/:id", async (req, res) => {
    const user = await getSensors(req.params.id);
    res.status(200).send(user);
});

/*
    app.put - Actualizar
    app.delete - Eliminar
    app.post - Agregar
    app.get - Obtener
*/

app.listen(8080, () => {
    console.log("Server running on port 8080");
});