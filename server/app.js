import express from "express";
import {
    getAllCrop,
    getGarden,
    getSensors,
    login,
} from "./database.js";
import cors from 'cors';
import multer from "multer";
import path from "path";

const corsOptions = {
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET"],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || ".jpg";
        cb(null, `${Date.now()}${ext}`);
    },
})

const upload = multer({ storage })

/**
 * USUARIO
 */

app.get("/user/:email/:pass", async (req, res) => {
    const user = await login(req.params.email, req.params.pass);
    res.status(200).send(user);
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
    Subir Imagen
*/

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        message: "Imagen subida correctamente",
        filename: req.file.filename
    });
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