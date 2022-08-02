/* 
DESARROLLO

Modulos:
    npm i express mongoose
    npm i nodemon morgan -D

    --- npm i express bcryptjs cors body-parser dotenv mongoose morgan helnet nodemon

Babel (es un transcompilador de javascript):
    Comando:
        npm i @babel/core @babel/cli @babel/node @babel/preset-env -D
    
    Agregar archivo ".babelrc" en la raiz del directorio
        {
            "presets": [
                "@babel/preset-env"
            ]
        }
*/

// Este archivo sirve para arrancar la aplicacion

import app from './app'
import './database'

app.listen(app.get("port"))
console.log("Server on port ", app.get("port"));