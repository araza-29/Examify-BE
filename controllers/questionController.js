const db = require('../Model')
const question = db.question

const createQuestion = async(req,res) => {
    const questionInfo = {
        name: req.body.name,
        topic_id: req.body.topic_id
    }
    const questions = await question.create(questionInfo)
    res.json(200).send(questions)
}

const updateQuestion = async(req,res) => {
    const questions = await question.update(req.body)
    res.json(200).send(questions)
}

const deleteQuestion = async(req,res) => {
    const questions = await question.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send(questions)
}

const reviewQuestion = async(req,res) => {
    const questions = await question.findOne({where:{id: req.paramas.id}})
    res.json(200).send(questions)
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    reviewQuestion
}