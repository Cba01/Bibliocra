import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },
    apellido: {
      type: String,
      trim: true,
    },
    usuario: {
        type: String,
        trim: true,
    },
    correo: {
      type: String,
      trim: true,
    },
    direccion: {
        type: String,
        trim: true,
    },
    telefono: {
        type: Number,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    rol: {
        type: String,
        trim: true,
        default: 'usuario',
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("User", userSchema);