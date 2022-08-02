import Disease from "../models/Disease"

export const getDiseases=async (req, res) => {
    try {
        const diseases=await Disease.find();
        return res.status(200).json(diseases);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addDisease=async (req, res) => {
    /*
    try {
        const newDisease=new Disease(req.body)
        const diseaseSaved=await newDisease.save()
        if(!diseaseSaved) return res.status(400).json({message: 'Enfermedad no guardado'})
        return res.status(200).json(diseaseSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
    */
}

export const updateDisease=async (req, res) => {
    /*
    try {
        const {diseaseName} = req.params
        const oldDisease=await Disease.findOneAndUpdate({'name': diseaseName}, req.body)
        if(!oldDisease) return res.status(400).json({message: 'Enfermedad no actualizado'})
        return res.status(200).json(oldDisease)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
    */
}

export const deleteDisease=async (req, res) => {
    try {
        const {diseaseName} = req.params
        const diseaseDeleted=await Disease.findOneAndDelete({'name': diseaseName});
        if(!diseaseDeleted) return res.status(400).json({message: 'Enfermedad no eliminado'})
        return res.status(200).json(diseaseDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}