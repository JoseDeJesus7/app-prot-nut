import Food from "../models/Food";
import Ingredient from "../models/Ingredient";
import Role from "../models/Role";
import User from "../models/User"

/* 
mongoose transactions (tema importante de dominar)
*/

export const getUsers=async (req, res) => {
    try {
        const users=await User.find().select("-password");
        var newUsers=await Role.populate(users, {path: "roles.id_role"});
        newUsers=await Food.populate(newUsers, {path: "registered_foods.id_food"});
        newUsers=await Ingredient.populate(newUsers, {path: "registered_foods.id_food.specifications.ingredients.id_ingredient"});
        newUsers=await Ingredient.populate(newUsers, {path: "registered_ingredients.id_ingredient"});
        return res.status(200).json(newUsers);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const getUserByName=async (req, res) => {
    try {
        const {userName} = req.params
        const user=await User.findOne({'username': userName}).select("-password")
        if(!user) return res.status(404).json({message: 'Usuario no encontrado'})
        var newUser=await Food.populate(user, {path: "registered_foods.id_food"});
        newUser=await Ingredient.populate(newUser, {path: "registered_foods.id_food.specifications.ingredients.id_ingredient"});
        newUser=await Ingredient.populate(newUser, {path: "registered_ingredients.id_ingredient"});
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addUser=async (req, res) => {
    try {
        const {roles}=req.body 
        var user=req.body
        const auxRoles=await Role.find({'name': { '$in': roles }})
        user.roles=auxRoles.map(elem => { return {id_role: elem._id} })
        const newUser=new User(user)
        const userSaved=await newUser.save()
        if(!userSaved) return res.status(400).json({message: 'Usuario no guardado'})
        return res.status(200).json(userSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateUser=async (req, res) => {
    try {
        const {userName} = req.params
        const {roles}=req.body 
        var user=req.body
        const auxRoles=await Role.find({'name': { '$in': roles }})
        user.roles=auxRoles.map(elem => { return {id_role: elem._id} })
        const oldUser=await User.findOneAndUpdate({'username': userName}, user)
        if(!oldUser) return res.status(400).json({message: 'Usuario no actualizado'})
        return res.status(200).json(oldUser)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

// Debemos eliminar los ingredientes y alimentos registrados por el usuario? Si
export const deleteUser=async (req, res) => {
    try {
        const {userName} = req.params
        const userDeleted=await User.findOneAndDelete({'username': userName});
        if(!userDeleted) return res.status(400).json({message: 'Usuario no eliminado'})
        const deletedIngredients=await Ingredient.deleteMany({'username': userName})
        const deletedFoods=await Food.deleteMany({'username': userName})
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}