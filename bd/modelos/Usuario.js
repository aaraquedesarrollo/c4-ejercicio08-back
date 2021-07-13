const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  contrasenya: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const Usuario = model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
