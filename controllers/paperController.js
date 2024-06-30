const db = require('../Model')
const paper = db.paper

const createPaper = async(req,res) => {
    const paperInfo = {
        mcqs_id: req.body.mcqs_id,
        question_id: req.body.question_id
    }
    const papers = paper.create(paperInfo)
    res.json(200),send(papers)
}

const updatePaper = async(req,res) => {
    const papers = paper.update(req.body)
    res.json(200).send(papers)
}

const deletePaper = async(req,res) => {
    const papers = paper.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Paper deleted !")
}

const reviewPaper = async(req,res) => {
    const papers = paper.findOne({where:{id:req.paramas.id}})
    res.json(200).send(papers)
}

module.exports = {
    createPaper,
    updatePaper,
    deletePaper,
    reviewPaper
}