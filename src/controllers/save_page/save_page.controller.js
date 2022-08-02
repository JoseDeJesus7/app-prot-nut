import User from "../../models/User"
import Food from "../../models/Food";
import Ingredient from "../../models/Ingredient";
import mongoose from "mongoose";

/* 
mongoose.Types.ObjectId
var ing=await Ingredient.findOne({_id: mongoose.Types.ObjectId('62d46c0f1eeac756a40f2d74')});

bulkWrite
    Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany 
    operations to the MongoDB server in one command. 
*/

export const saveUser=async (req, res) => {
    try {
        const {
            username,
            photo, 
            //roles,
            birthday, 
            weight, 
            height, 
            gender, 
            percentage_nutrients, 
            objective,
            physical_activity,
            diseases,
            registered_foods,
            registered_ingredients,
            calendar,
            diets,
            diets_date
        }=req.body;
        var user=req.user;

        //return res.status(401).json();
        
        /// Operaciones ingredientes
        var registeredIngredients=registered_ingredients.map((e) => JSON.parse(e))
        var namesIngredientsIds=registeredIngredients.map((e) => e.id_ingredient._id)
        var listDeleteIngredients=user.registered_ingredients.filter((e) => !namesIngredientsIds.includes(e.id_ingredient.toString()))
        var bulkOpsDelete=listDeleteIngredients.map((e) => {
            return { deleteOne: { filter: { _id: e.id_ingredient } } }
        })
        var oldIngredients=registeredIngredients.filter((e) => e.id_ingredient._id!='')
        var newIngredients=registeredIngredients.filter((e) => e.id_ingredient._id=='')
        var bulkOpsUpdate=oldIngredients.map((e) => {
            return {
                updateOne: {
                    filter: { _id: e.id_ingredient._id },
                    update: {
                        $set: { 
                            name: e.id_ingredient.name,
                            description: e.id_ingredient.description,
                            nutritional_information: e.id_ingredient.nutritional_information 
                        }
                    }
                }
            }
        })
        var bulkOpsAdd=newIngredients.map((e) => {
            return {
                insertOne: {
                    document: {
                        username: e.id_ingredient.username,
                        name: e.id_ingredient.name,
                        description: e.id_ingredient.description,
                        nutritional_information: e.id_ingredient.nutritional_information,
                    }
                } 
            }
        })
        var bulkOps=bulkOpsDelete.concat(bulkOpsUpdate).concat(bulkOpsAdd);
        var result=await Ingredient.bulkWrite(bulkOps);
        if(!result) return res.status(400).json({message: 'Algo ha salido mal para las operaciones de ingredientes'})
        var newRegisteredIngredients=[]
        var keys=Object.keys(result.insertedIds)
        for(var i=0; i<keys.length; i++){ newRegisteredIngredients.push({ id_ingredient: result.insertedIds[keys[i]] }) }
        newRegisteredIngredients=newRegisteredIngredients.concat( oldIngredients.map((e) => { return { id_ingredient: mongoose.Types.ObjectId(e.id_ingredient._id) } }) )

        /// Operaciones alimentos
        var registeredFoods=registered_foods.map((e) => JSON.parse(e))
        var namesFoodsIds=registeredFoods.map((e) => e.id_food._id)
        var listDeleteFoods=user.registered_foods.filter((e) => !namesFoodsIds.includes(e.id_food.toString()))
        bulkOpsDelete=listDeleteFoods.map((e) => {
            return { deleteOne: { filter: { _id: e.id_food } } }
        })
        var oldFoods=registeredFoods.filter((e) => e.id_food._id!='')
        var newFoods=registeredFoods.filter((e) => e.id_food._id=='')
        bulkOpsUpdate=oldFoods.map((e) => {
            return {
                updateOne: {
                    filter: { _id: e.id_food._id },
                    update: {
                        $set: { 
                            picture: e.id_food.picture,
                            name: e.id_food.name,
                            description: e.id_food.description,
                            specifications: e.id_food.specifications 
                        }
                    }
                }
            }
        })
        bulkOpsAdd=newFoods.map((e) => {
            return {
                insertOne: {
                    document: {
                        username: e.id_food.username,
                        picture: e.id_food.picture,
                        name: e.id_food.name,
                        description: e.id_food.description,
                        specifications: e.id_food.specifications 
                    }
                } 
            }
        })
        bulkOps=bulkOpsDelete.concat(bulkOpsUpdate).concat(bulkOpsAdd);
        result=await Food.bulkWrite(bulkOps);
        if(!result) return res.status(400).json({message: 'Algo ha salido mal para las operaciones de alimentos'})
        var newRegisteredFoods=[]
        var keys=Object.keys(result.insertedIds)
        for(var i=0; i<keys.length; i++){ newRegisteredFoods.push({ id_food: result.insertedIds[keys[i]] }) }
        newRegisteredFoods=newRegisteredFoods.concat( oldFoods.map((e) => { return { id_food: mongoose.Types.ObjectId(e.id_food._id) } }) )

        var cal=calendar.map((e) => JSON.parse(e))
        cal.forEach(e => {
            e.date=new Date(e.date);
        });
        var dietsDate=diets_date.map((e) => JSON.parse(e));
        dietsDate.forEach(e => {
            e.date=new Date(e.date)
        });
        const oldUser=await User.findOneAndUpdate(
            {'username': username},
            {
                //_id
                //username
                //password
                'photo': photo,
                //roles
                'birthday': new Date(birthday), 
                'weight': weight, 
                'height': height, 
                'gender': gender, 
                'percentage_nutrients': JSON.parse(percentage_nutrients), 
                'objective': objective,
                'physical_activity': physical_activity,
                'diseases': diseases,
                'registered_foods': newRegisteredFoods,
                'registered_ingredients': newRegisteredIngredients,
                'calendar': cal,
                'diets': JSON.parse(diets),
                'diets_date': dietsDate
                //createdAt
                //updatedAt
            }
        )
        if(!oldUser) return res.status(400).json({message: 'Usuario no guardado'})
        return res.status(200).json(oldUser)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}