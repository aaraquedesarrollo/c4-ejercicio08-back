require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearItems,
  listarItemsDeUsuario,
} = require("../../bd/controladores/itemController");
const {
  comprobarUsuarioId,
} = require("../../bd/controladores/usuarioController");
const { crearError } = require("../errores");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

// prueba para crear items
router.get("/crearItems", async (req, res, next) => {
  const itemsCreados = await crearItems();
  console.log(itemsCreados);
  res.json(itemsCreados);
});

router.get("/listado", authMiddleware, async (req, res, next) => {
  const { idUsuario } = req;
  const usuarioExiste = comprobarUsuarioId(idUsuario);
  if (usuarioExiste) {
    res.json(await listarItemsDeUsuario(idUsuario));
  } else {
    const nuevoError = crearError("No existe el usuario", 400);
    next(nuevoError);
  }
});

module.exports = router;
