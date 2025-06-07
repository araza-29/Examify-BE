const db = require('../Model')
const { Sequelize, Op } = require('sequelize');
const Topic = db.ctopic
const question = db.questions
const chapter = db.cchapter
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
    const questions = await question.query("SELECT q.*, t.id AS topic_id, t.name AS topic_name, c.id AS chapter_id, c.name AS chapter_name, s.id AS subject_id, s.name AS subject_name, l.id AS class_id, l.name AS class_name FROM questions q JOIN ctopic t ON t.id = q.topic_id JOIN cchapter c ON c.id = t.chapter_id JOIN SUBJECT s ON s.id = c.subject_id JOIN class l ON l.id = c.class_id WHERE subject_id IN (SELECT subject_id FROM teacher WHERE user_id = :uid) AND class_id IN (SELECT class_id FROM teacher WHERE user_id = :uid)",
        {
        replacements: { uid: req.user_id },
        type: Sequelize.QueryTypes.SELECT
    }
    )
    if(questions) {
        console.log(questions);
        res.json({code: 200, data: questions});
    }
    else {
        res.json({code: 300, data: []})
    }
}
const reviewEveryDetailsQuestionsByUserId = async(req,res) => {
    const questions = await question.query("SELECT q.*, t.id AS topic_id, t.name AS topic_name, c.id AS chapter_id, c.name AS chapter_name, s.id AS subject_id, s.name AS subject_name, l.id AS class_id, l.name AS class_name FROM questions q JOIN ctopic t ON t.id = q.topic_id JOIN cchapter c ON c.id = t.chapter_id JOIN SUBJECT s ON s.id = c.subject_id JOIN class l ON l.id = c.class_id WHERE subject_id IN (SELECT subject_id FROM teacher WHERE user_id = :uid) AND class_id IN (SELECT class_id FROM teacher WHERE user_id = :uid)",
        {
        replacements: { uid: req.user_id },
        type: Sequelize.QueryTypes.SELECT
    }
    )
    if(questions) {
        console.log(questions);
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
    reviewEveryDetailsQuestionsByUserId
}