const db = require('../Model')
const subject = db.subject
const teacher = db.teacher

const createSubject = async(req,res) => {
    const subjectInfo = {
        name: req.body.name,
        class_id: req.body.class_id,
        user_id: req.body.user_id
    }

    const subjects = await subject.create(subjectInfo)
    res.json(200).send(subjects)
}

const updateSubject = async(req,res) => {
    const subjects = await subject.update(req.body)
    res.json(200).send(subjects)
}

const deleteSubject = async(req,res) => {
    const subjects = await subject.update({status: false}, {where:{id:req.paramas.id}})
    res.json(200).send("Subject deleted !")
}

const reviewSubjectByUserID = async(req,res) => {
    const subjects = await teacher.findAll({where:{user_id: req.body.user_id}})
    res.json({code: 200, data: subjects});
}

const reviewSubjectsByClassID = async(req,res) => {
    const subjects = await subject.findAll({where:{ class_id:req.body.class_id}})
    res.json({code: 200, data: subjects});
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    reviewSubjectByUserID,
    reviewSubjectsByClassID
}