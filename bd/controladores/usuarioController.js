const debug = require("debug")("api:bd:controladores:usuarioController");
const chalk = require("chalk");

const Usuario = require("../modelos/Usuario");

const crearUsuarios = async () => {
  try {
    const usuariosCreados = await Usuario.insertMany([
      {
        nombre: "Pepe",
        contrasenya: "elmasmejor",
        username: "pepe19",
      },
      {
        nombre: "Albert",
        contrasenya: "otroalbert",
        username: "nosoyelmismoalbert",
      },
      {
        nombre: "Manolito",
        contrasenya: "manolito123",
        username: "manolito_fontanero",
      },
    ]);
    return usuariosCreados;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido crear a los usuarios"));
    debug(chalk.redBright.bold(err.message));
  }
};

const comprobarUsuario = async (usernameBody, contrasenyaBody) => {
  try {
    const usuarioComprobado = await Usuario.findOne({
      username: usernameBody,
      contrasenya: contrasenyaBody,
    });
    return usuarioComprobado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido buscar al usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

const comprobarUsuarioId = async (idUsuario) => {
  try {
    const usuarioComprobado = await Usuario.findById(idUsuario);
    return usuarioComprobado;
  } catch (err) {
    debug(chalk.redBright.bold("No se ha podido buscar al usuario"));
    debug(chalk.redBright.bold(err.message));
  }
};

module.exports = {
  crearUsuarios,
  comprobarUsuario,
  comprobarUsuarioId,
};
