const db = require('../Model')
const questionMapping = db.questionMapping

const createQuestionMapping = async(req,res) => {
    const info = {
        paper_id: req.body.paper_id,
        question_id: req.body.question_id,
        mcqs_id: req.body.mcqs_id,
        section_id: req.body.section_id
    }
    const mapping = await questionMapping.create(info)
    res.json({code: 200, data: mapping})
}

const updateQuestionMapping = async(req,res) => {
    const mapping = await questionMapping.update(req.body)
    res.json(200).send(mapping)
}

const deleteQuestionMapping = async(req,res) => {
    const mapping = await questionMapping.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send(mapping)
}

const reviewQuestionMapping = async(req,res) => {
    const mapping = await questionMapping.findOne({where:{id: req.paramas.id}})
    res.json(200).send(mapping)
}

const reviewPaper = async(req,res) => {
    const mapping = await questionMapping.findAll({where:{paper_id: req.body.paper_id}})
    res.json(200).send(mapping)
}

const reviewPastPaperQuestions = async(req,res) => {
    const mapping = await questionMapping.findAll({where:{question_id: req.body.question_id}})
    res.json(200).send(mapping)
}

module.exports = {
    createQuestionMapping,
    updateQuestionMapping,
    deleteQuestionMapping,
    reviewPaper,
    reviewPastPaperQuestions,
    reviewQuestionMapping
}