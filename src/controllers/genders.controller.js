import Gender from "../models/Gender"

export const getGenders=async (req, res) => {
    try {
        const genders=await Gender.find();
        return res.status(200).json(genders);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addGender=async (req, res) => {
    try {
        const newGender=new Gender(req.body)
        const genderSaved=await newGender.save()
        if(!genderSaved) return res.status(400).json({message: 'Genero no guardado'})
        return res.status(200).json(genderSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateGender=async (req, res) => {
    try {
        const {genderName} = req.params
        const oldGender=await Gender.findOneAndUpdate({'name': genderName}, req.body)
        if(!oldGender) return res.status(400).json({message: 'Genero no actualizado'})
        return res.status(200).json(oldGender)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deleteGender=async (req, res) => {
    try {
        const {genderName} = req.params
        const genderDeleted=await Gender.findOneAndDelete({'name': genderName});
        if(!genderDeleted) return res.status(400).json({message: 'Genero no eliminado'})
        return res.status(200).json(genderDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}