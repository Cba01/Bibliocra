import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("User", userSchema);