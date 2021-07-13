const morganFreeman = require("morgan");
const express = require("express");
const app = require("./init");
const { errorGeneral, error404 } = require("./errores");
const { rutasUsuarios } = require("./rutas/usuarios");
const { rutasItems } = require("./rutas/items");

app.use(morganFreeman("dev"));
app.use(express.json());

// rutas
app.use("/usuarios", rutasUsuarios);
app.use("/items", rutasItems);

app.use(error404);
app.use(errorGeneral);
