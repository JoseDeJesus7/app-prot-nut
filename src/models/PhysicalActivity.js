import { Schema, model } from "mongoose";

const physicalActivitySchema=new Schema({
    name: {
        type: String,
        enum: ["Muy leve","Leve","Moderada","Elevada"]
    }
},{
    versionKey: false
});

export default model("PhysicalActivity", physicalActivitySchema);