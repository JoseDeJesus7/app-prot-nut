// Este archivo sirve para configurar la aplicacion de express

import express from "express";
import pkg from "../package.json"
import config from "./config";
//import cors from "cors";
//import morgan from "morgan";
import bodyParser from "body-parser"

// Importamos rutas para un apartado en especifico
import foodsRouter from "./routes/foods.routes"
import ingredientsRouter from "./routes/ingredients.routes"
import usersRouter from "./routes/users.routes"
import rolesRouter from "./routes/roles.routes"
import gendersRouter from "./routes/genders.routes"
import objectivesRouter from "./routes/objectives.routes"
import physicalActivitiesRouter from "./routes/physical_activities.routes"
import diseasesRouter from "./routes/diseases.routes"

// Login Page
import loginPageRouter from "./routes/login_page/login_page.routes"
// Register Page
import registerPageRouter from "./routes/register_page/register_page.routes"
// Save Page
import savePageRouter from "./routes/save_page/save_page.routes"

// Iniciamos express
const app=express()

// Configuraciones de express
const port=config.PORT;
app.set("port", port)
app.set('pkg', pkg)
//app.use(cors())
//app.use(morgan("dev"))
// Si se envia poca informacion 
//app.use(express.json())
// Si se envia mucha informacion
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));

// En la ruta inicial mostramos los detalles de la aplicacion
app.get('/api/prototype_nutrition', (req, res) => {
    res.status(200).json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

// Todas las rutas van a comenzar con <some>: app.use('/<some>',<object_of_type_Router>)
app.use('/api/prototype_nutrition/foods', foodsRouter)
app.use('/api/prototype_nutrition/ingredients', ingredientsRouter)
app.use('/api/prototype_nutrition/users', usersRouter)
app.use('/api/prototype_nutrition/roles', rolesRouter)
app.use('/api/prototype_nutrition/genders', gendersRouter)
app.use('/api/prototype_nutrition/objectives', objectivesRouter)
app.use('/api/prototype_nutrition/physical_activities', physicalActivitiesRouter)
app.use('/api/prototype_nutrition/diseases', diseasesRouter)

// Login Page
app.use('/api/prototype_nutrition/login_page', loginPageRouter)
// Register Page
app.use('/api/prototype_nutrition/register_page', registerPageRouter)
// Save Page
app.use('/api/prototype_nutrition/save', savePageRouter)

export default app