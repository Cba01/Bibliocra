import { Schema, model } from "mongoose";
import Book from './book';

const libroInfoSchema = new Schema(
    {
        idlibro: {
          type: Schema.Types.ObjectId,
          ref: 'Book'
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
      ref: 'User'
    },
    libros: [libroInfoSchema],
    total: {
        type: Number,
        trim: true
    },
    fechaCompra: {
        type: Date,
        trim: true
    },
    estado: {
      type: String,
      trim: true,
      default: 'pendiente',
  },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Venta", ventaSchema);