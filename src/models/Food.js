import {Schema, model} from "mongoose"

const foodSchema=new Schema({
    username: {
        type: String
    },
    picture: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    specifications: {
        _id: false,
        type: {
            cost: Number,
            duration: Number, // En minutos
            ingredients: [{
                _id: false,
                id_ingredient: {
                    type: Schema.Types.ObjectId, 
                    ref: "Ingredient"
                },
                total: {
                    type: Number
                }
            }]
        }
    }
},{
    timestamps: true,
    versionKey: false,
})

export default model("Food", foodSchema)