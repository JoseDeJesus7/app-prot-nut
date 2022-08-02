import mongoose from "mongoose";
import config from "./config"

mongoose.connect(config.URL_DB, {
    
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))