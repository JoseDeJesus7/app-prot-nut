import {Schema, model} from "mongoose"

const ingredientSchema=new Schema({
    username: {
        type: String
    },
    name: {
        type: String,
        unique: true
    },
    description: {
        type: Object
    },
    nutritional_information: [{
        type: Object
    }]
},{
    timestamps: true,
    versionKey: false
})

export default model('Ingredient', ingredientSchema)