import Role from "../models/Role"

export const getRoles=async (req, res) => {
    try {
        const roles=await Role.find();
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const addRole=async (req, res) => {
    try {
        const newRole=new Role(req.body)
        const roleSaved=await newRole.save()
        if(!roleSaved) return res.status(400).json({message: 'Role no guardado'})
        return res.status(200).json(roleSaved)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const updateRole=async (req, res) => {
    try {
        const {roleName} = req.params
        const oldRole=await Role.findOneAndUpdate({'name': roleName}, req.body)
        if(!oldRole) return res.status(400).json({message: 'Role no actualizado'})
        return res.status(200).json(oldRole)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}

export const deleteRole=async (req, res) => {
    try {
        const {roleName} = req.params
        const roleDeleted=await Role.findOneAndDelete({'name': roleName});
        if(!roleDeleted) return res.status(400).json({message: 'Role no eliminado'})
        return res.status(200).json(roleDeleted)
    } catch (error) {
        return res.status(500).json({message: "Ha ocurrido un problema", error});
    }
}