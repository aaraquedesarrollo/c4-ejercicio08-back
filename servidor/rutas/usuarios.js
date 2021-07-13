require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearUsuarios,
  comprobarUsuario,
} = require("../../bd/controladores/usuarioController");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    const nuevoError = new Error("Petición no autentificada");
    nuevoError.codigo = 403;
    return next(nuevoError);
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const datosToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = datosToken;
    req.idUsuario = id;
    next();
  } catch (e) {
    // Token incorrecto
    if (e.message.includes("expired")) {
      const nuevoError = new Error("Token caducado");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    next(e);
  }
};

router.get("/crearUsuarios", async (req, res, next) => {
  const usuariosCreados = await crearUsuarios();
  console.log(usuariosCreados);
});

router.post("/login", async (req, res, next) => {
  const { contrasenya, username } = req.body;
  if (!username || !contrasenya) {
    const nuevoError = new Error("Faltan credenciales");
    nuevoError.codigo = 400;
    return next(nuevoError);
  }
  const usuarioComprobado = await comprobarUsuario(username, contrasenya);
  if (!usuarioComprobado) {
    const nuevoError = new Error("Credenciales incorrectas");
    nuevoError.codigo = 403;
    return next(nuevoError);
  }
  const idUsuario = usuarioComprobado._id;
  const token = jwt.sign({ idusuario: idUsuario }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

module.exports = router;
