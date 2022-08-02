import User from "../../models/User"
import Role from "../../models/Role"
import bcrypt from "bcrypt"

/* 

*/

// Para los usuarios que tienen una contrasena no encriptada
export const setPassword=async (req, res) => {
    try {
        var user=req.user;
        const salts=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(user.password, salts)
        var updatedUser=await User.updateOne({"username": user.username}, {$set: {"password": hashPassword}})
        if(!updatedUser) return res.status(400).json({message: 'No se pudo actualizar la contraseña del usuario'})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const register=async (req, res) => {
    try {
        const {
            username,
            password, 
            photo, 
            // roles,
            birthday, 
            weight, 
            height, 
            gender, 
            // percentage_nutrients, 
            objective,
            physical_activity,
            diseases,
            // registered_foods,
            // registered_ingredients,
            // calendar,
            // diets,
            // diets_date
        }=req.body;
        
        // Por defecto se asigna el role "Usuario"
        var auxRoles=await Role.find({'name': { '$in': ["Usuario"] }})
        var roles=auxRoles.map(elem => { return {id_role: elem._id} })
        // Calcular porcentaje de nutrientes
        var percentage_nutrients={
            "carbohydrates": 0.5,
            "proteins": 0.3,
            "fats": 0.2
        }

        const newUser=new User({
            username,
            password,
            photo,
            roles,
            birthday,
            weight,
            height,
            gender,
            percentage_nutrients,
            objective,
            physical_activity,
            diseases,
            registered_foods: [],
            registered_ingredients: [],
            calendar: [],
            diets: [],
            diets_date: []
        });
        
        const salts=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password, salts)
        newUser.password=hashPassword

        var b=new Date(newUser.birthday)
        b.setMinutes(b.getMinutes() + b.getTimezoneOffset())
        newUser.birthday=b

        const userSaved=await newUser.save()
        if(!userSaved) return res.status(400).json({message: 'Usuario no guardado'})
        return res.status(200).json(userSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

