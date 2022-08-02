import dotenv from "dotenv"
dotenv.config()

module.exports={
    PORT: process.env.PORT || 4001,
    SECRET_KEY: process.env.SECRET_KEY,
    //URL_DB: 'mongodb://localhost/prototype_nutrition',
    URL_DB: "mongodb+srv://"+process.env.USER_DB_MONGODB+":"+process.env.PASSWORD_DB_MONGODB+"@cluster0.kxvjqqt.mongodb.net/"+process.env.DB_MONGODB+"?retryWrites=true&w=majority"
}

