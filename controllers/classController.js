const db = require('../Model')
const classes = db.class

const createClass = async(req,res) => {
    const classInfo = {
        name: req.body.name,
        center_id: req.body.center_id
    }
    const clas = await classes.create(classInfo)
    res.json(200).send(clas)
}

const updateClass = async(req,res) => {
    const clas = await classes.update(req.body)
    res.json(200).send(clas)
}

const deleteClass = async(req,res) => {
    const clas = await classes.update({status:false},{where:{id:req.paramas.id}})
    res.json(200).send("Class deleted !")
}

const reviewClass = async(req,res) => {
    const clas = await classes.findOne({where:{id:req.paramas.id}})
    res.json(200).send(clas)
}

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    reviewClass
}
