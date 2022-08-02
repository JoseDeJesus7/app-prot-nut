import User from "../models/User";

export const verifyUser=async (req, res, next) => {
    try {
        const {username} = req.body;
        //const user=await User.findOne({'username': username}).select("-password");
        const user=await User.findOne({'username': username});
        if(user){
            req.user=user;
            return next();
        }
        return res.status(401).json({message: "Sin autorizacion, el usuario no existe"})
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}