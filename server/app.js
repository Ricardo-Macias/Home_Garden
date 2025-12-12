import express from "express";
import {
    getAllCrop,
    getGarden,
    getSensors
} from "./database.js";
import cors from 'cors';

// Importar controladores
import { login, register, refreshToken } from "./controllers/authController.js";
import { getUser, removeUser } from "./controllers/userController.js";

const corsOptions = {
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHedaers: ["Content-Type", "Authorization"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

/**
 * USUARIO
 */

app.post("/login", login);
app.post("/register", register);
app.post("/refresh", refreshToken);

app.get("/user/:id", getUser);
app.delete("/user/:id", removeUser);


/**
 * SENSORES
 */

app.get("/sensor/:id", async (req, res) => {
    const sensor = await getSensors(req.params.id);
    res.status(200).send(sensor);
});

/**
 * HUERTO
 */

app.get("/garden/:id", async (req, res) => {
    const garden = await getGarden(req.params.id);
    res.status(200).send(garden);
});

/**
 * CULTIVO
 */

app.get("/crop", async (req, res) => {
    const crop = await getAllCrop();
    res.status(200).send(crop);
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