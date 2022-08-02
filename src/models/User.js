import {Schema, model} from "mongoose"

/*
Si se realizan modificaciones al esquema, es necesario ejecutar el siguiente comando
en el shell (y mas necesario cuando se usa el atributo "unique"):
    db.getCollection('<collection>').dropIndexes()
*/

const userSchema=new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    photo: {
        type: String,
        default: ""
    },
    roles: [{
        _id: false,
        id_role: {
            ref: "Role",
            type: Schema.Types.ObjectId
        }
    }],
    birthday: {
        type: Date 
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["F","M"] 
    },
    percentage_nutrients: {
        carbohydrates: Number,
        proteins: Number,
        fats: Number
    },
    objective: {
        type: String,
        enum: ["Bajar peso","Mantenerme","Ganar masa muscular"]
    },
    physical_activity:  {
        type: String,
        enum: ["Muy leve","Leve","Moderada","Elevada"]
    },
    diseases: [{
        type: String,
    }],
    registered_foods: [{
        _id: false,
        id_food: {
            ref: "Food",
            type: Schema.Types.ObjectId
        }
    }],
    registered_ingredients: [{
        _id: false,
        id_ingredient: {
            ref: "Ingredient",
            type: Schema.Types.ObjectId
        }
    }],
    calendar: [{
        _id: false,
        date: {
            type: Date
        },
        diet_type: {
            _id: false,
            type: String,
            enum: ["Free","Custom"]
        },
        free_diet: [{
            _id: false,
            name_food: {
                type: String,
            },
            quantity: {
                type: Number
            }
        }],
        custom_diet: {
            name_diet: {
                _id: false,
                type: String,
            },
            checked_foods: [{
                _id: false,
                name_food: {
                    type: String,
                },
                percentage: {
                    type: Number
                }
            }],
            other_foods: [{
                _id: false,
                name_food: {
                    type: String,
                },
                quantity: {
                    type: Number
                }
            }]
        } 
    }],
    diets: [{
        _id: false,
        name: {
            type: String,
        },
        foods: [{
            _id: false,
            name_food: {
                type: String,
            },
            quantity: {
                type: Number
            }
        }]
    }],
    diets_date: [{
        _id: false,
        date: {
            type: Date
        },
        name_diet: {
            type: String,
        }
    }]
},{
    timestamps: true,
    versionKey: false,
})

export default model("User", userSchema)