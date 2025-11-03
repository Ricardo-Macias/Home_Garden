import express from "express";
import {
    getAllCrop,
    getGarden,
    getSensors,
    login,
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

/**
 * USUARIO
 */

app.get("/user/:email/:pass", async (req, res) => {
    const user = await login(req.params.email, req.params.pass);
    res.status(200).send(user);
});

app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    const user = await login(email, pass);
    if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.status(200).json(user);
});


import { insertUser } from "./database.js";

app.post("/register", async (req, res) => {
    const { nombre, apellidos, correo, pass } = req.body;

    if (!nombre || !apellidos || !correo || !pass) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const result = await insertUser(nombre, apellidos, correo, pass);
        res.status(201).json({ message: "Usuario creado correctamente", result });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "No se pudo registrar el usuario" });
    }
});

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