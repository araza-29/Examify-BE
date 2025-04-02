const db = require('../Model')
const { Sequelize, Op } = require('sequelize');
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
        type: req.body.type
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

const reviewMcq = async(req,res) => {
    const mcq = await mcqs.findAll({
        include:[{
            model: Topic,
            attributes:[['id','topic_id'],['name','topic_name']],
            include:[{
                model: chapter,
                attributes:[['name','chapter_name'],['id','chapter_id']],
                include:[{
                    model: subject,
                    attributes:[['id','subject_id'],['name','subject_name']]
                }]
            }]
        }]
    })
    if(mcq) {
        const transformedData = mcq.map(item => {
            const plainItem = item.toJSON();  
            return {
                ...plainItem,
                chapter_id: plainItem.topic.chapter.chapter_id,
                topic_id: plainItem.topic.topic_id,
                subject_id: plainItem.topic.chapter.subject.subject_id,
                topic_name: plainItem.topic.topic_name,
                chapter_name: plainItem.topic.chapter.chapter_name,
                subject_name: plainItem.topic.chapter.subject.subject_name,
                topic: undefined,
                chapter: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
    }
    else {
        res.json(300).send("Error");
    }
}

const reviewMcqsBySubjectID = async(req,res) => {
    const mcq = await mcqs.findAll({
        include:[{
            model: Topic,
            attributes:[['id','topic_id'],['name','topic_name']],
            include:[{
                model: chapter,
                attributes:[['name','chapter_name'],['id','chapter_id']],
                include:[{
                    model: subject,
                    attributes:[['id','subject_id'],['name','subject_name']],
                    where: {
                        id: req.body.subject_id
                    }
                }]
            }]
        }]
    })
    if(mcq) {
        const transformedData = mcq.map(item => {
            const plainItem = item.toJSON();  
            return {
                ...plainItem,
                chapter_id: plainItem.topic.chapter.chapter_id,
                topic_id: plainItem.topic.topic_id,
                subject_id: plainItem.topic.chapter.subject.subject_id,
                topic_name: plainItem.topic.topic_name,
                chapter_name: plainItem.topic.chapter.chapter_name,
                subject_name: plainItem.topic.chapter.subject.subject_name,
                topic: undefined,
                chapter: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
    }
    else {
        res.json(300).send("Error");
    }
}
const reviewMcqsByUserID = async(req,res) => {
    const mcq = await mcqs.findAll({
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
    if(mcq) {
        const transformedData = mcq.map(item => {
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
    createMcqs,
    updateMcqs,
    deleteMcqs,
    reviewMcqsBySubjectID,
    reviewMcqsByUserID,
    reviewMcq
}