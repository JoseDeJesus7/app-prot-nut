import Food from "../../models/Food";
import Ingredient from "../../models/Ingredient";
import User from "../../models/User"
import Role from "../../models/Role"
import Gender from "../../models/Gender";
import Objective from "../../models/Objective";
import PhysicalActivity from "../../models/PhysicalActivity";
import bcrypt from "bcrypt"

/* 

*/

function getDate(date){
    let formatted_date=date.getFullYear()+"-"+(date.getMonth()+1).toString().padStart(2, 0)+"-"+date.getDate().toString().padStart(2, 0)
    return formatted_date;
}

function createCalendarDay(username, d, dietType){
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
    var obj={
        "date": d,
        "diet_type": dietType,
        "free_diet": [],
        "custom_diet": {
            "name_diet": "",
            "checked_foods": [],
            "other_foods": []
        }
    }
    return User.updateOne({'username': username}, {$push: {calendar: obj}})
}

export const login=async (req, res) => {
    try {
        const {username, password}=req.body;
        var user=await User.findOne({'username': username})
        if(!user) return res.status(404).json({message: 'Usuario no encontrado'})
        const match=await bcrypt.compare(password, user.password)
        if(!match) return res.status(403).json({message: "Contraseña incorrecta"})

        // Verificar si ya se creo un nuevo dia en el calendario, de lo contrario crearlo 
        var today=getDate(new Date())
        var d=new Date(today);
        var calendar=user.calendar.filter((elem) => getDate(elem.date)==today)
        if(calendar.length==0){
            // Verificar si se sigue dieta
            var dietsDate=user.diets_date.filter((elem) => getDate(elem.date)==today);
            var dietType=dietsDate.length==0 ? "Free" : "Custom"
            await createCalendarDay(username, d, dietType)
            user=await User.findOne({'username': username}).select("-password")
        }

        var newUser=await Role.populate(user, {path: "roles.id_role"});
        newUser=await Food.populate(user, {path: "registered_foods.id_food"});
        newUser=await Ingredient.populate(newUser, {path: "registered_foods.id_food.specifications.ingredients.id_ingredient"});
        newUser=await Ingredient.populate(newUser, {path: "registered_ingredients.id_ingredient"});
        if(!newUser) return res.status(400).json({message: 'Hubo un problema al poblar los datos del usuario'})
        
        // Obtenemos los generos
        const genders=await Gender.find({});

        // Obtenemos los objetivos
        const objectives=await Objective.find({});

        // Obtenemos las actividades fisicas
        const physicalActivities=await PhysicalActivity.find({});

        // Todos los alimentos
        const allFoods=await Food.find({});

        // Todos los ingredientes
        const allIngredients=await Ingredient.find({});

        return res.status(200).json({user: newUser, genders, objectives, physicalActivities, allFoods, allIngredients})
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

