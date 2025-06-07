const db = require('../Model')
const chapter = db.cchapter

const createChapter = async(req,res) => {
    const chapterInfo = {
        name: req.body.name,
        subject_id: req.body.subject_id
    }
    const chapters = await chapter.create(chapterInfo)
    res.json(200).send(chapters)
}

const updateChapter = async(req,res) => {
    const chapters = await chapter.update(req.body)
    res.json(200).send(chapters)
}

const deleteChapter = async(req,res) => {
    const chapters = await chapter.update({status:false}, {where:{id: req.paramas.id}})
    res.json(200).send(chapters)
}

const reviewChapter = async(req,res) => {
    const chapters = await chapter.findOne({where:{id:req.paramas.id}})
    res.json(200).send(chapters)
}

const reviewChapterBySubjectId = async(req,res) => {
    const chapters = await chapter.findAll({where:{subject_id: req.body.subject_id}})
    if(chapters){
        res.json({code: 200, data: chapters})}
    else 
        res.json({code:300, data: []})
}

module.exports = {
    createChapter,
    updateChapter,
    deleteChapter,
    reviewChapter,
    reviewChapterBySubjectId
}