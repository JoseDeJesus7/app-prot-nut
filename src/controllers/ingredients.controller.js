import Ingredient from "../models/Ingredient"
import User from "../models/User";

/* 
Al agregar o eliminar un ingrediente se tiene que modificar el atributo "registered_ingredients" del usuario.
(Al modificar no porque lo que referenciamos es el ID del ingrediente)

mongoose transactions (tema importante de dominar)
*/

export const getIngredients=async (req, res) => {
    try {
        const ingredients=await Ingredient.find();
        return res.status(200).json(ingredients);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const getIngredientByName=async (req, res) => {
    try {
        const {ingredientName} = req.params
        const ingredient=await Ingredient.findOne({'name': ingredientName})
        if(!ingredient) return res.status(404).json({message: 'Ingrediente no encontrado'})
        return res.status(200).json(ingredient)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const getIngredientsByUsername=async (req, res) => {
    try {
        const {userName} = req.params
        const ingredients=await Ingredient.find({'username': userName})
        if(!ingredients) return res.status(404).json({message: 'No se encontraron ingredientes para el usuario'})
        return res.status(200).json(ingredients)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addIngredient=async (req, res) => {
    try {
        const {username} = req.body
        const newIngredient=new Ingredient(req.body)
        const ingredientSaved=await newIngredient.save()
        if(!ingredientSaved) return res.status(400).json({message: 'Ingrediente no guardado'})

        // Agregamos el ingrediente al usuario que lo creo
        const user=await User.findOne({"username": username})
        if(!user) return res.status(400).json({message: 'Usuario no encontrado'})
        var registeredIngredients=user.registered_ingredients
        registeredIngredients.push({"id_ingredient": ingredientSaved._id});
        const userUpdated=await User.updateOne({"username": username}, {
            '$set': {'registered_ingredients': registeredIngredients}
        });
        if(!userUpdated) return res.status(400).json({message: 'El ingrediente se ha guardado pero no se pudo agregar el ingrediente al usuario'})

        return res.status(200).json(ingredientSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateIngredient=async (req, res) => {
    try {
        const {ingredientName} = req.params
        const oldIngredient=await Ingredient.findOneAndUpdate({'name': ingredientName}, req.body)
        if(!oldIngredient) return res.status(400).json({message: 'Ingrediente no actualizado'})
        return res.status(200).json(oldIngredient)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deleteIngredient=async (req, res) => {
    try {
        const {userName, ingredientName} = req.params

        // Eliminamos el ingrediente al usuario que lo creo
        const user=await User.findOne({"username": userName})
        if(!user) return res.status(400).json({message: 'Usuario no encontrado'})
        var newUser=await Ingredient.populate(user, {path: "registered_ingredients.id_ingredient"});
        var registeredIngredients=newUser.registered_ingredients
        registeredIngredients=registeredIngredients.filter(elem => elem.id_ingredient.name!=ingredientName)
        registeredIngredients=registeredIngredients.map(elem => { return {"id_ingredient": elem.id_ingredient._id} })
        const userUpdated=await User.updateOne({"username": userName}, {
            '$set': {'registered_ingredients': registeredIngredients}
        });
        if(!userUpdated) return res.status(400).json({message: 'No se pudo eliminar el ingrediente al usuario'})

        // Eliminamos el ingrediente
        const ingredientDeleted=await Ingredient.findOneAndDelete({'name': ingredientName});
        if(!ingredientDeleted) return res.status(400).json({message: 'Ingrediente no eliminado'})
        
        return res.status(200).json(ingredientDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}