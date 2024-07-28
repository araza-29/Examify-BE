const db = require('../Model')
const answer = db.answer

const createAnswer = async(req,res) => {
    const answerInfo = {
        answer: req.body.answer,
        question_id: req.body.question_id
    }
    const answers = await answer.create(answerInfo)
    res.json(200).send(answers)
}

const updateAnswer = async(req,res) => {
    const answers = await answer.update(req.body)
    res.json(200).send(answers)
}

const deleteAnswer = async(req,res) => {
    const answers = await answer.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Answer deleted !")
}

const reviewAnswer = async(req,res) => {
    const answers = await answer.findOne({where:{id:req.paramas.id}})
    res.json(200).send(answers)
}

const getAnswer = async(req,res) => {
    const answers = await answer.findAll({where:{question_id: req.body.question_id}})
    res.json(200).send(answers)
}

module.exports = {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    reviewAnswer,
    getAnswer
}