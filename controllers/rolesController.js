const db = require('../Model')
const roles = db.roles

const createRoles = async (req,res) => {
    const roleInfo = {
        role: req.body.role
    }
    const role = await roles.create(roleInfo)
    res.json(200).send(role)
}

const updateRoles = async(req,res) => {
    const role = await roles.update(req.body)
    res.json(200).send(role)
}

const deleteRoles = async(req,res) => {
    const role = await roles.update({status:false},{where:{id:req.paramas.id}})
    res.json(200).send("Role deleted!")
}

const reviewRoles = async(req,res) => {
    const role = await roles.findOne({where:{id:req.paramas.id}})
    res.json(200).send(role)
}

module.exports = {
    createRoles,
    updateRoles,
    deleteRoles,
    reviewRoles
}