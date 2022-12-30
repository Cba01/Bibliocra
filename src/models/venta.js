import { Schema, model } from "mongoose";
import Book from './book';

const libroInfoSchema = new Schema(
    {
        idlibro: {
          type: Schema.Types.ObjectId,
          ref: 'Books'
        },
        title: {
            type: String
        },
        precio: {
            type: Number
        },
        cantidad: {
            type: Number
        }
    }
)

const ventaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    libros: [libroInfoSchema],
    total: {
        type: Number,
        trim: true
    },
    fechaCompra: {
        type: Date,
        trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Venta", ventaSchema);