import { Schema, model } from "mongoose";

const objectiveSchema=new Schema({
    name: {
        type: String,
        enum: ["Bajar peso","Mantenerme","Ganar masa muscular"]
    },
    add_calories: {
        gender: [{
            name: String,
            cal: Number,
            _id: false
        }]
    }
},{
    versionKey: false
});

export default model("Objective", objectiveSchema);