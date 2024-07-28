const db = require('../Model')
const choices = db.choices

const createChoices = async(req,res) => {
    const choicesInfo = {
        choice: req.body.choice,
        mcqs_id: req.body.mcqs_id
    }
    const choice = await choices.create(choicesInfo)
    res.json(200).send(choice)
}

const updateChoices = async(req,res) => {
    const choice = await choices.update(req.body)
    res.json(200).send(choice)
}

const deleteChoices = async(req,res) => {
    const choice = await choices.delete({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Choice deleted !")
}

const reviewChoice = async (req,res) => {
    const choice = await choices.findOne({where:{id:req.paramas.id}})
    res.json(200).send(choice)
}

const reviewChoices = async(req,res) => {
    const choice = await choices.findAll({where:{mcqs_id: req.body.mcqs_id}})
    res.json(200).send(choice)
}

module.exports = {
    createChoices,
    updateChoices,
    deleteChoices,
    reviewChoices,
    reviewChoice
}