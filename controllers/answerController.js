const db = require('../Model')
const answer = db.answer

const createAnswer = async(req,res) => {
    const imageFilename = req.file ? req.file.filename : null;
    console.log("Request", req.body)
    const answerInfo = {
        answer: req.body.answer,
        question_id: req.body.question_id,
        image: imageFilename
    }
    const answers = await answer.create(answerInfo)
    res.json({code: 200, data: answers})
}

const updateAnswer = async(req,res) => {
    const imageFilename = req.file ? req.file.filename : null;
    const answers = await answer.update({answer: req.body.answer, image: imageFilename }, {where: {question_id: req.body.question_id }})
    res.json({code: 200, data: answers})
}

const deleteAnswer = async(req,res) => {
    const answers = await answer.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Answer deleted !")
}

const reviewAnswer = async(req,res) => {
    const answers = await answer.findOne({where:{question_id:req.body.question_id}})
    res.json({code: 200, data: answers})
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