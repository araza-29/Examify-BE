const db = require('../Model')
const { Sequelize, Op } = require('sequelize');
const sequelize = db.sequelize
const mcqs = db.mcqs
const Topic = db.topic
const chapter = db.chapter
const subject = db.subject

const createMcqs = async(req,res) => {
    const mcqsInfo = {
        name: req.body.name,
        topic_id: req.body.topic_id,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        answer: req.body.answer,
        type: req.body.type,
        medium: req.body.medium
    }
    const mcq = await mcqs.create(mcqsInfo)
    res.json({code: 200, data: mcq})
}

const updateMcqs = async(req,res) => {
    const mcq = await mcqs.update(req.body, {where:{id: req.body.mcq_id}})
    res.json({code: 200, data: mcq})
}

const deleteMcqs = async(req,res) => {
    const mcq = await mcqs.update({status: false}, {where:{id: req.paramas.id}})
    res.json(200).send(mcq)
}

const reviewMcqsBySubjectID = async(req,res) => {
    const mcqs = await sequelize.query("SELECT q.*, t.id AS topic_id, t.name AS topic_name, c.id AS chapter_id, c.name AS chapter_name, s.id AS subject_id, s.name AS subject_name, l.id AS class_id, l.name AS class_name FROM mcqs q JOIN ctopic t ON t.id = q.topic_id JOIN cchapter c ON c.id = t.chapter_id JOIN SUBJECT s ON s.id = c.subject_id JOIN class l ON l.id = c.class_id WHERE subject_id = :sid AND class_id =:cid AND q.medium=:med",
        {
        replacements: { cid: req.body.class_id, sid: req.body.subject_id, med: req.body.medium },
        type: Sequelize.QueryTypes.SELECT
        }
    )
    if(mcqs) {
        console.log(mcqs);
        res.json({code: 200, data: mcqs});
    }
    else {
        res.json({code: 300, data: []})
    }
}

// const reviewMcqsBySubjectID = async(req,res) => {
//     const mcq = await mcqs.findAll({
//         include:[{
//             model: Topic,
//             required: true,
//             attributes:[['id','topic_id'],['name','topic_name']],
//             include:[{
//                 model: chapter,
//                 required: true,
//                 attributes:[['name','chapter_name'],['id','chapter_id']],
//                 include:[{
//                     model: subject,
//                     required: true,
//                     attributes:[['id','subject_id'],['name','subject_name']],
//                     where: {
//                         id: req.body.subject_id
//                     }
//                 }]
//             }]
//         }]
//     })
//     if(mcq) {
//         console.log("MCQS fetched", mcq);
//         const transformedData = mcq.map(item => {
//             const plainItem = item.toJSON();  
//             return {
//                 ...plainItem,
//                 chapter_id: plainItem.topic.chapter.chapter_id,
//                 topic_id: plainItem.topic.topic_id,
//                 subject_id: plainItem.topic.chapter.subject.subject_id,
//                 topic_name: plainItem.topic.topic_name,
//                 chapter_name: plainItem.topic.chapter.chapter_name,
//                 subject_name: plainItem.topic.chapter.subject.subject_name,
//                 topic: undefined,
//                 chapter: undefined,
//                 subject: undefined
//             };
//         });
//         console.log(transformedData);
//         res.json({code: 200, data: transformedData});
//     }
//     else {
//         res.json(300).send("Error");
//     }
// }
const reviewMcqsByUserID = async(req,res) => {
    const mcq = await sequelize.query("SELECT q.*, t.id AS topic_id, t.name AS topic_name, c.id AS chapter_id, c.name AS chapter_name, s.id AS subject_id, s.name AS subject_name, l.id AS class_id, l.name AS class_name FROM mcqs q JOIN ctopic t ON t.id = q.topic_id JOIN cchapter c ON c.id = t.chapter_id JOIN SUBJECT s ON s.id = c.subject_id JOIN class l ON l.id = c.class_id WHERE subject_id IN (SELECT subject_id FROM teacher WHERE user_id = :uid) AND class_id IN (SELECT class_id FROM teacher WHERE user_id = :uid)",
        {
            replacements: { uid: req.body.user_id },
            type: Sequelize.QueryTypes.SELECT
        }
        )
    if(mcq) {
        console.log(mcq);
        res.json({code: 200, data: mcq});
    }
    else {
        res.json({code: 300, data: []})
    }
}

module.exports = {
    createMcqs,
    updateMcqs,
    deleteMcqs,
    reviewMcqsBySubjectID,
    reviewMcqsByUserID
}