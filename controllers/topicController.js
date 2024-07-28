const db = require('../Model')
const topic = db.topic

const createTopic = async(req,res) => {
    const topicInfo = {
        name: req.body.name,
        chapter_id: req.body.chapter_id
    }
    const topic = await topic.create(topicInfo)
    res.json(200).send(topicInfo)
}

const updateTopic = async(req,res) => {
    const topic = await topic.update(req.body)
    res.json(200).send(topic)
}

const deleteTopic = async(req,res) => {
    const topic = await topic.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send("Topic deleted !")
}

const reviewTopic = async(req,res) => {
    const topic = await topic.findOne({where:{id: req.paramas.id}})
    res.json(200).send(topic)
}

const reviewTopicsbychapterId = async(req,res) => {
    const topic = await topic.findAll({where: {chapter_id: req.body.chapter_id}})
    res.json(200).send(topic)
}

module.exports = {
    createTopic,
    updateTopic,
    deleteTopic,
    reviewTopic,
    reviewTopicsbychapterId
}