import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Book", bookSchema);
