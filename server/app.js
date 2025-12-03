import express from "express";
import {
    getAllCrop,
    getGarden,
    getSensors,
    login,
    insertUser,
    findUserByCorreo,
    getUserById
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

// LOGIN
app.post("/login", async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    try {
        const user = await login(email, pass); // bcrypt.compare internamente
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        res.status(200).json({ message: "Login exitoso", user });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "No se pudo iniciar sesión, revisa que los datos sean correctos" });
    }
});

// REGISTER
app.post("/register", async (req, res) => {
    const { nombre, apellidos, correo, pass } = req.body;

    if (!nombre || !apellidos || !correo || !pass) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passRegex.test(pass)) {
        return res.status(400).json({
            error: "La contraseña debe tener mínimo 8 caracteres, incluir letras y números.",
        });
    }

    try {
        // valida si el correo está duplicado
        const existingByCorreo = await findUserByCorreo(correo);
        if (existingByCorreo) {
            return res.status(400).json({
                error: "Este correo ya está registrado.",
            });
        }

        // inserta usuario (bcrypt.hash en database.js)
        const result = await insertUser(nombre, apellidos, correo, pass);
        res.status(201).json({ message: "Usuario creado correctamente", result });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "No se pudo registrar el usuario" });
    }
});

// GET USER BY ID
app.get("/user/:id", async (req, res) => {
    console.log("ID recibido:", req.params.id);
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error al consultar usuario:", error);
        res.status(500).json({ error: "Error en el servidor" });
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