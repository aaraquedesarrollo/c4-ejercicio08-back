const express = require("express");
const debug = require("debug")("api:servidor:servidor");
const chalk = require("chalk");
const { errorServidor } = require("./errores");

const app = express();

const puerto = process.env.PORT || process.env.MI_PORT || 4000;

const server = app.listen(puerto, () => {
  debug(
    chalk.greenBright.bold(`Servidor escuchando en http://localhost:${puerto}`)
  );
});

server.on("error", (e) => {
  errorServidor(e, puerto);
});

module.exports = app;
