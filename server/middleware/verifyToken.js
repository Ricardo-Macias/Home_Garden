import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export default function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).json({ error: "Token requerido" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token invalido" });
        req.userId = decoded.indexOf; // se guarda el id del usuario en el request
        next();
    });
}