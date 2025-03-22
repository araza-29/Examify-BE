const db = require('../Model')
const { Sequelize, Op } = require('sequelize');
const Topic = db.topic
const question = db.questions
const chapter = db.chapter
const subject = db.subject

const createQuestion = async(req,res) => {
    const questionInfo = {
        name: req.body.name,
        topic_id: req.body.topic_id,
        image: req.body.image,
        marks: req.body.marks,
        selected: req.body.selected,
        type: req.body.type
    }
    const questions = await question.create(questionInfo)
    if(questions){
        res.json({code: 200, data: questions})
    }
    else {
        res.json({code: 500, data: null})
    }
}

const updateQuestion = async(req,res) => {
    const questions = await question.update(req.body, {where: {id: req.body.id}});
    res.json({code: 200, data: questions});
}

const deleteQuestion = async(req,res) => {
    const questions = await question.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send(questions)
}

const reviewQuestion = async(req,res) => {
    const questions = await question.findOne({where:{id: req.paramas.id}})
    res.json(200).send(questions)
}

const reviewQuestionsBySubjectId = async(req,res) => {
    const questions = await question.findAll({
        include:[{
            model: Topic,
            required: true,
            attributes:[['id','topic_id'],['name','topic_name']],
            include:[{
                model: chapter,
                required: true,
                attributes: [['id','chapter_id'],['name','chapter_name']],
                include: [{
                    model: subject,
                    required: true,
                    attributes: [['id','subject_id'],['name','subject_name']],
                    where: { id: req.body.subject_id }
                }]
            }]
        }]
    })
    if(questions) {
        const transformedData = questions.map(item => {
            const plainItem = item.toJSON();  
            return {
                ...plainItem,
                topic_id: plainItem.topic.topic_id,
                chapter_id: plainItem.topic.chapter.chapter_id,
                topic_name: plainItem.topic.topic_name,
                chapter_name: plainItem.topic.chapter.chapter_name,
                subject_name: plainItem.topic.chapter.subject.subject_name,
                subject_id: plainItem.topic.chapter.subject.subject_id,
                topic: undefined,
                chapter: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
    }
    else {
        res.json({code: 300, data: []})
    }
}
const reviewEveryDetailsQuestionsByUserId = async(req,res) => {
    const questions = await question.findAll({
        include:[{
            model: Topic,
            attributes: [['id','topic_id'],['name', 'topic_name']],
            include: [{
                model: chapter,
                attributes: [['name','chapter_name'],['id','chapter_id']],
                include:[{
                    model: subject,
                    attributes: [['id','subject_id'],['name','subject_name']],
                    where: {
                        user_id: req.body.user_id
                    },
                    required: false 
                }]
            }]
    }],
    where: {
        [Op.or]: [
            { type: 'public' },
            {
                '$Topic.chapter.subject.user_id$': req.body.user_id
            }
        ]
    }
    });
    if(questions) {
        const transformedData = questions.map(item => {
            const plainItem = item.toJSON();  
            return {
                ...plainItem,
                topic_id: plainItem.topic.topic_id,
                chapter_id: plainItem.topic.chapter.chapter_id,
                topic_name: plainItem.topic.topic_name,
                chapter_name: plainItem.topic.chapter.chapter_name,
                subject_name: plainItem.topic.chapter.subject.subject_name,
                subject_id: plainItem.topic.chapter.subject.subject_id,
                topic: undefined,
                chapter: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
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
    reviewEveryDetailsQuestionsByUserId
}