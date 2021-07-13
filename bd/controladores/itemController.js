const debug = require("debug")("api:bd:controladores:itemController");
const chalk = require("chalk");

const Item = require("../modelos/Item");

const crearItems = async () => {
  try {
    const itemsCreados = await Item.insertMany([
      {
        nombre: "Pera",
        idUsuario: "60ed77117bab4f0de037ce18",
      },
      {
        nombre: "Manzana",
        idUsuario: "60ed77117bab4f0de037ce18",
      },
      {
        nombre: "Sandia",
        idUsuario: "60ed77117bab4f0de037ce18",
      },
      {
        nombre: "Melon",
        idUsuario: "60ed77f085ae5523a09f2484",
      },
      {
        nombre: "Aguacate",
        idUsuario: "60ed77f085ae5523a09f2484",
      },
      {
        nombre: "Limon",
        idUsuario: "60ed77f085ae5523a09f2484",
      },
      {
        nombre: "Cereza",
        idUsuario: "60ed77f085ae5523a09f2486",
      },
      {
        nombre: "Piña",
        idUsuario: "60ed77f085ae5523a09f2486",
      },
      {
        nombre: "Granada",
        idUsuario: "60ed77f085ae5523a09f2486",
      },
    ]);
    return itemsCreados;
  } catch (err) {
    debug(chalk.redBright.bold("No se han podido crear los items"));
    debug(chalk.redBright.bold(err.message));
  }
};

const listarItemsDeUsuario = async (idUsuarioBody) => {
  try {
    const listaItems = await Item.find({ idUsuario: idUsuarioBody });
    return listaItems;
  } catch (err) {
    debug(
      chalk.redBright.bold(
        `No se han podido listar los items de este usuario ${idUsuarioBody}`
      )
    );
    debug(chalk.redBright.bold(err.message));
  }
};

module.exports = {
  crearItems,
  listarItemsDeUsuario,
};
