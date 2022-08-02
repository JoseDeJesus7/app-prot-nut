import Objective from "../models/Objective"

export const getObjectives=async (req, res) => {
    try {
        const objectives=await Objective.find();
        return res.status(200).json(objectives);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addObjective=async (req, res) => {
    try {
        const newObjective=new Objective(req.body)
        const objectiveSaved=await newObjective.save()
        if(!objectiveSaved) return res.status(400).json({message: 'Objetivo no guardado'})
        return res.status(200).json(objectiveSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateObjective=async (req, res) => {
    try {
        const {objectiveName} = req.params
        const oldObjective=await Objective.findOneAndUpdate({'name': objectiveName}, req.body)
        if(!oldObjective) return res.status(400).json({message: 'Objetivo no actualizado'})
        return res.status(200).json(oldObjective)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deleteObjective=async (req, res) => {
    try {
        const {objectiveName} = req.params
        const objectiveDeleted=await Objective.findOneAndDelete({'name': objectiveName});
        if(!objectiveDeleted) return res.status(400).json({message: 'Objetivo no eliminado'})
        return res.status(200).json(objectiveDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}