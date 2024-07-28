const db = require('../Model')
const checkers = db.checkers

const createCheckers = async(req,res) => {
    const checkersInfo = {
        user_id: req.body.user_id,
        subject_id: req.body.subject_id,
        question_id: req.body.question_id,
        part_id: req.body.part_id
    }
    const checker = await checkers.create(checkersInfo)
    res.json(200).send(checker)
}

const updateCheckers = async(req,res) => {
    const checker = await checkers.update(req.body)
    res.json(200).send(checker)
}

const deleteCheckers = async(req,res) => {
    const checker = await checkers.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send('Checkers deleted !')
}

const reviewChecker = async(req,res) => {
    const checker = await checkers.findOne({where:{id: req.paramas.id}})
    res.json(200).send(checker)
}

const reviewCheckers = async(req,res) => {
    const checker = await checkers.findAll({where: {subject_id: req.body.subject_id}})
    res.json(200).send(checker)
}

module.exports = {
    createCheckers,
    updateCheckers,
    deleteCheckers,
    reviewChecker,
    reviewCheckers
}