const db = require('../Model')
const subject = db.subject

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
    const subject = await subject.update({status: false}, {where:{id:req.paramas.id}})
    res.json(200).send("Subject deleted !")
}

const reviewSubject = async(req,res) => {
    const subject = await subject.findOne({where:{id: req.paramas.id}})
    res.json(200).send(subject)
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    reviewSubject
}