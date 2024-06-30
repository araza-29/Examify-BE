const db = require('../Model')
const key = db.key

const createKey = async(req,res) => {
    const keyInfo = {
        choice_id: req.body.choice_id,
        answer_id: req.body.answer_id,
        paper_id: req.body.question_id
    }
    const keys = key.create(keyInfo)
    res.json(200).send(keys)
}

const updateKey = async(req,res) => {
    const keys = key.update(req.body)
    res.json(200).send(keys)
}

const deleteKey = async(req,res) => {
    const keys = key.update({status: false}, {where:{id:req.paramas.id}})
    res.json(200).send("Keys deleted !")
}

const reviewKey = async(req,res) => {
    const keys = key.findOne({where:{id:req.paramas.id}})
    res.json(200).send(keys)
}

module.exports = {
    createKey,
    updateKey,
    deleteKey,
    reviewKey
}