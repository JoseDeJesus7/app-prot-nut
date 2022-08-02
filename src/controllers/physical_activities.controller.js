import PhysicalActivity from "../models/PhysicalActivity"

export const getPhysicalActivities=async (req, res) => {
    try {
        const physicalActivities=await PhysicalActivity.find();
        return res.status(200).json(physicalActivities);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addPhysicalActivity=async (req, res) => {
    try {
        const newPhysicalActivity=new PhysicalActivity(req.body)
        const physicalActivitySaved=await newPhysicalActivity.save()
        if(!physicalActivitySaved) return res.status(400).json({message: 'Actividad fisica no guardado'})
        return res.status(200).json(physicalActivitySaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updatePhysicalActivity=async (req, res) => {
    try {
        const {physicalActivityName} = req.params
        const oldPhysicalActivity=await PhysicalActivity.findOneAndUpdate({'name': physicalActivityName}, req.body)
        if(!oldPhysicalActivity) return res.status(400).json({message: 'Actividad fisica no actualizado'})
        return res.status(200).json(oldPhysicalActivity)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deletePhysicalActivity=async (req, res) => {
    try {
        const {physicalActivityName} = req.params
        const physicalActivityDeleted=await PhysicalActivity.findOneAndDelete({'name': physicalActivityName});
        if(!physicalActivityDeleted) return res.status(400).json({message: 'Actividad fisica no eliminado'})
        return res.status(200).json(physicalActivityDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}