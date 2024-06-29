const db = require('../Model')
const center = db.center

const createCenter = async(req,res) => {
    const centerData = {
        name: req.body.name,
    }
    const center = await center.create(centerData)
    res.status(200).send(center)
}

const updateCenter = async(req,res) => {
    const center = await center.update(req,body)
    res.status(200).send(center)
}

const deleteCenter = async(req,res) => {
    const center = await center.update({status:false},{where:{id:req.paramas.id}})
    res.json(200).send("Center deleted")
}

const reviewCenter = async(req,res) => {
    const center = await center.findOne({where:{id:req.paramas.id}})
    res.json(200).send(center)
}

module.exports = {
    createCenter,
    updateCenter,
    deleteCenter,
    reviewCenter
}