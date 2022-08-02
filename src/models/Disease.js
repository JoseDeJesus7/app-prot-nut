import {Schema, model} from "mongoose"

const diseaseSchema=new Schema({
    name: {
        type: String,
        unique: true
    }
})

export default model("Disease", diseaseSchema)