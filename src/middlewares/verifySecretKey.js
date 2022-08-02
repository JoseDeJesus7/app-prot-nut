import config from "../config";

export const verifySecretKey=async (req, res, next) => {
    try {
        const {secret_key} = req.body;
        if(secret_key==config.SECRET_KEY){
            return next();
        }
        return res.status(401).json({message: "Sin autorizacion"})
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}