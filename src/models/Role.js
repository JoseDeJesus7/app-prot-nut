import { Schema, model } from "mongoose";

const roleSchema=new Schema({
    name: {
        type: String,
        enum: ["Administrador", "Usuario"],
        unique: true
    }
},{
    versionKey: false
});

export default model("Role", roleSchema);