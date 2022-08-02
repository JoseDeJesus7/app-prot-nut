import mongoose from "mongoose";
import Food from "../models/Food";
import Ingredient from "../models/Ingredient";
import User from "../models/User";

/* 
Al agregar o eliminar un alimento se tiene que modificar el atributo "registeded_foods" del usuario.
(Al modificar no porque lo que referenciamos es el ID del alimento)

mongoose transactions (tema importante de dominar)
*/

export const getFoods=async (req, res) => {
    try {
        const foods=await Food.find();
        const newFoods=await Ingredient.populate(foods, {path: "specifications.ingredients.id_ingredient"});
        return res.status(200).json(newFoods);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const getFoodByName=async (req, res) => {
    try {
        const {foodName} = req.params
        const food=await Food.findOne({'name': foodName})
        if(!food) return res.status(404).json({message: 'Alimento no encontrado'})
        const newFood=await Ingredient.populate(food, {path: "specifications.ingredients.id_ingredient"})
        return res.status(200).json(newFood)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const getFoodsByUsername=async (req, res) => {
    try {
        const {userName} = req.params
        const foods=await Food.find({'username': userName})
        if(!foods) return res.status(404).json({message: 'No se encontraron alimentos para el usuario'})
        return res.status(200).json(foods)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addFood=async (req, res) => {
    try {
        var {username, picture, name, description, specifications}=req.body;
        specifications.ingredients.sort(function(a,b) {
            if (a.name > b.name) return 1
            else if (a.name < b.name) return -1
            else return 0;
        })
        var listNameIngredients=specifications.ingredients.map(elem => elem.name_ingredient)
        const ingredients=await Ingredient.find({'name': {
            '$in': listNameIngredients
        }}).sort({'name': 1}); // 1 ascendente -1 descendente
        for(var i=0; i<specifications.ingredients.length; i++){
            specifications.ingredients[i]={
                'id_ingredient': ingredients[i]._id,
                'total': specifications.ingredients[i].total
            }
        }
        const food={
            username,
            picture,
            name, 
            description, 
            specifications
        }
        const newFood=new Food(food)
        const foodSaved=await newFood.save()
        if(!foodSaved) return res.status(400).json({message: 'Alimento no guardado'})
        
        // Agregamos el alimento al usuario que lo creo
        const user=await User.findOne({"username": username})
        if(!user) return res.status(400).json({message: 'Usuario no encontrado'})
        var registeredFoods=user.registered_foods
        registeredFoods.push({"id_food": foodSaved._id});
        const userUpdated=await User.updateOne({"username": username}, {
            '$set': {'registered_foods': registeredFoods}
        });
        if(!userUpdated) return res.status(400).json({message: 'El alimento se ha guardado pero no se pudo agregar el alimento al usuario'})

        return res.status(200).json(foodSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateFood=async (req, res) => {
    try {
        const {foodName} = req.params
        var {username, picture, name, description, specifications}=req.body;
        specifications.ingredients.sort(function(a,b) {
            if (a.name > b.name) return 1
            else if (a.name < b.name) return -1
            else return 0;
        })
        var listNameIngredients=specifications.ingredients.map(elem => elem.name_ingredient)
        const ingredients=await Ingredient.find({'name': {
            '$in': listNameIngredients
        }}).sort({'name': 1}); // 1 ascendente -1 descendente
        for(var i=0; i<specifications.ingredients.length; i++){
            specifications.ingredients[i]={
                'id_ingredient': ingredients[i]._id,
                'total': specifications.ingredients[i].total
            }
        }
        const food={
            username,
            picture,
            name, 
            description, 
            specifications
        }
        const oldFood=await Food.findOneAndUpdate({'name': foodName}, food)
        if(!oldFood) return res.status(400).json({message: 'Alimento no actualizado'})
        return res.status(200).json(oldFood)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deleteFood=async (req, res) => {
    try {
        const {userName, foodName} = req.params

        // Eliminamos el alimento al usuario que lo creo
        const user=await User.findOne({"username": userName})
        if(!user) return res.status(400).json({message: 'Usuario no encontrado'})
        var newUser=await Food.populate(user, {path: "registered_foods.id_food"});
        var registeredFood=newUser.registered_foods
        registeredFood=registeredFood.filter(elem => elem.id_food.name!=foodName)
        registeredFood=registeredFood.map(elem => { return {"id_food": elem.id_food._id} })
        const userUpdated=await User.updateOne({"username": userName}, {
            '$set': {'registered_foods': registeredFood}
        });
        if(!userUpdated) return res.status(400).json({message: 'No se pudo eliminar el alimento al usuario'})

        // Eliminamos el alimento
        const foodDeleted=await Food.findOneAndDelete({'name': foodName});
        if(!foodDeleted) return res.status(400).json({message: 'Alimento no eliminado'})

        return res.status(200).json(foodDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}