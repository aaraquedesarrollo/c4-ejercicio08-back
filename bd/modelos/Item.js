const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

const Item = model("Item", ItemSchema, "items");

module.exports = Item;
