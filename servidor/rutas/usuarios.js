const express = require("express");
const { crearUsuarios } = require("../../bd/controladores/usuarioController");

const router = express.Router();

router.get("/crearUsuarios", async (req, res, next) => {
  const usuariosCreados = await crearUsuarios();
  console.log(usuariosCreados);
});

router.post("/login", (req, res, next) => {});

module.exports = router;
