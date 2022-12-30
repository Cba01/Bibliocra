import { Schema, model } from "mongoose";
/* TODO: Validar modelo */
const cartSchema = new Schema(
  {
    libros: {
      type: String,
      trim: true,
    },
    total: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true
  }
);

export default model("Cart", cartSchema);