const db = require('../Model')
const question = db.questions

const createQuestion = async(req,res) => {
    const questionInfo = {
        name: req.body.name,
        topic_id: req.body.topic_id,
        image: req.body.image
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

const reviewQuestionsByTopicId = async(req,res) => {
    const questions = await question.findAll({where:{topic_id: req.body.topic_id}})
    res.json(200).send(questions)
}

const reviewQuestionsBySubjectId = async(req,res) => {
    const questions = await question.findAll({where:{subject_id: req.body.subject_id}})
    if(questions) {
        res.json({code: 200, data: questions});
    }
    else {
        res.json({code: 300, data: []})
    }
}
module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    reviewQuestion,
    reviewQuestionsBySubjectId,
    reviewQuestionsByTopicId
}