import { Schema, model } from "mongoose";

/*
TMR: Formula de Harris y Benedict
FA: Factores medios de actividad fisica 
*/

const genderSchema=new Schema({
    name: {
        type: String,
        enum: ["F","M"] 
    },
    calculation: {
        tmr: {
            // Valores basados en la formula de Harris y Benedict
            independent_value: Number,
            weight_factor: Number,
            height_factor: Number,
            age_factor: Number
        },
        fa: [{
            // "description" tiene uno de estos valores: ["Muy leve","Leve","Moderada","Elevada"]
            description: String,
            factor: Number,
            _id: false
        }]
    }
},{
    versionKey: false
});

export default model("Gender", genderSchema);