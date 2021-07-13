require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearUsuarios,
  comprobarUsuario,
} = require("../../bd/controladores/usuarioController");
const { crearError } = require("../errores");

const router = express.Router();

router.get("/crearUsuarios", async (req, res, next) => {
  const usuariosCreados = await crearUsuarios();
  console.log(usuariosCreados);
  next();
});

router.post("/login", async (req, res, next) => {
  const { contrasenya, username } = req.body;
  if (!username || !contrasenya) {
    const nuevoError = crearError("Faltan credenciales", 400);
    return next(nuevoError);
  }
  const usuarioComprobado = await comprobarUsuario(username, contrasenya);
  if (!usuarioComprobado) {
    const nuevoError = crearError("Credenciales incorrectas", 403);
    return next(nuevoError);
  }
  const idUsuarioComprobado = usuarioComprobado._id;
  const token = jwt.sign(
    { idUsuario: idUsuarioComprobado },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({ token });
});

module.exports = router;
