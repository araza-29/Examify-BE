const db = require('../Model')
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = db.sequelize;
const Topic = db.ctopic
const question = db.questions
const chapter = db.cchapter
const subject = db.subject

const createQuestion = async(req,res) => {
    const imageFilename = req.file ? req.file.filename : null;
    const questionInfo = {
        name: req.body.name,
        topic_id: req.body.topic_id,
        image: imageFilename,
        marks: req.body.marks,
        selected: req.body.selected,
        type: req.body.type,
        medium: req.body.medium
    }
    const questions = await question.create(questionInfo)
    console.log("Uploaded File:", req.file);
    if(questions){
        res.json({code: 200, data: questions})
    }
    else {
        res.json({code: 500, data: null})
    }
}

const updateQuestion = async(req,res) => {
    const imageFilename = req.file ? req.file.filename : null;
    req.body = {...req.body, image: imageFilename}
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

const reviewQuestionsBySubjectId = async (req, res) => {
    try {
        const questions = await sequelize.query(`
            SELECT q.*, t.id AS topic_id, t.name AS topic_name, 
                   c.id AS chapter_id, c.name AS chapter_name, 
                   s.id AS subject_id, s.name AS subject_name, 
                   l.id AS class_id, l.name AS class_name 
            FROM questions q 
            JOIN ctopic t ON t.id = q.topic_id 
            JOIN cchapter c ON c.id = t.chapter_id 
            JOIN SUBJECT s ON s.id = c.subject_id 
            JOIN class l ON l.id = c.class_id 
            WHERE subject_id = :sid AND class_id = :cid AND q.medium = :med`,
            {
                replacements: { 
                    cid: req.body.class_id, 
                    sid: req.body.subject_id, 
                    med: req.body.medium 
                },
                type: Sequelize.QueryTypes.SELECT
            }
        );

        if (!questions || questions.length === 0) {
            return res.json({ code: 300, data: [] });
        }

        // Process each question to add base64 image data if available
        const processedQuestions = await Promise.all(questions.map(async (question) => {
            if (question.image && question.image!=="null") {
                try {
                    const filename = question.image;
                    const imagePath = path.join(__dirname, '../uploads/', filename);
                    
                    if (fs.existsSync(imagePath)) {
                        const imageBuffer = fs.readFileSync(imagePath);
                        const base64Data = imageBuffer.toString('base64');
                        const ext = path.extname(filename).toLowerCase();
                        const mimeTypes = {
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg',
                            '.png': 'image/png',
                            '.gif': 'image/gif'
                        };
                        const mimeType = mimeTypes[ext] || 'image/jpeg';
                        return {
                            ...question,
                            image: `data:${mimeType};base64,${base64Data}`
                        };
                    }
                } catch (err) {
                    console.error(`Error processing image for question ${question.id}:`, err);
                }
            }
            return question;
        }));

        res.json({ code: 200, data: processedQuestions });
    } catch (err) {
        console.error('Error in reviewQuestionsBySubjectId:', err);
        res.status(500).json({ code: 500, message: 'Server error' });
    }
};
const reviewEveryDetailsQuestionsByUserId = async(req,res) => {
    const questions = await sequelize.query("SELECT q.*, t.id AS topic_id, t.name AS topic_name, c.id AS chapter_id, c.name AS chapter_name, s.id AS subject_id, s.name AS subject_name, l.id AS class_id, l.name AS class_name FROM questions q JOIN ctopic t ON t.id = q.topic_id JOIN cchapter c ON c.id = t.chapter_id JOIN SUBJECT s ON s.id = c.subject_id JOIN class l ON l.id = c.class_id WHERE c.subject_id IN (SELECT subject_id FROM teacher WHERE user_id = :uid) AND class_id IN (SELECT class_id FROM teacher WHERE user_id = :uid)",
        {
        replacements: { uid: req.body.user_id },
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