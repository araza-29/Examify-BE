const db = require('../Model')
const classes = db.class
const teacher = db.teacher
const sequelize = db.sequelize
const Sequelize = db.Sequelize

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

const reviewClassesByUserID = async(req,res) => {
    const clas = await sequelize.query("Select Distinct c.* from teacher t join class c on t.class_id = c.id where t.user_id = :uid",
        {
            replacements: { uid: req.body.user_id },
            type: Sequelize.QueryTypes.SELECT
        }

    )
    res.json({code: 200, data: clas})
}

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    reviewClass,
    reviewClassesByUserID
}
