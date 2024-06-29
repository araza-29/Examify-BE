const db = require('../Model')
const mcqs = db.mcqs

const createMcqs = async(req,res) => {
    const mcqsInfo = {
        mcq: req.body.mcq,
        topic_id: req.body.topic_id
    }
    const mcq = await mcqs.create(mcqsInfo)
    res.json(200).send(mcq)
}

const updateMcqs = async(req,res) => {
    const mcq = await mcqs.update(req.body)
    res.json(200).send(mcq)
}

const deleteMcqs = async(req,res) => {
    const mcq = await mcqs.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send(mcq)
}

const reviewMcqs = async(req,res) => {
    const mcq = await mcqs.findOne({where:{id: req.paramas.id}})
    res.json(200).send(mcq)
}

module.exports = {
    createMcqs,
    updateMcqs,
    deleteMcqs,
    reviewMcqs
}