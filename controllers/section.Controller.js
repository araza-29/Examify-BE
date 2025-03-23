const db = require('../Model')
const section = db.section

const createSection = async (req,res) => {
    const info = {
        section: req.body.section,
        paper_id: req.body.paper_id,
        type: req.body.type,
        description: req.body.description,
        marks: req.body.marks
    }
    const sections = await section.create(info);
    res.json({code: 200, data: sections})
}

const deleteSection = async(req,res) => {
    const sections = section.delete({where: {id: req.body.section_id}});
    res.json({code: 200, data: sections})
}

const reviewSectionByPaperID = async(req,res) => {
    const sections = section.review({where: {paper_id: req.body.paper_id}});
    res.json({code: 200, data: sections})
}

module.exports = {
    createSection,
    deleteSection,
    reviewSectionByPaperID
}