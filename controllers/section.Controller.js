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
    const sections = await section.findAll({where: {paper_id: req.body.paper_id}});
    console.log("Sections", sections)
    const transformedSections = sections.map((sec) => ({
        name: sec.section, // Assuming the column in your DB is named 'section'
        id: sec.id,
        type: sec.type,
        description: sec.description,
        marks: sec.marks
      }));
    res.json({code: 200, data: transformedSections})
}

const reviewSectionsCheck = async(req,res) => {
    const sections = await section.findAll({where: {paper_id: req.body.paper_id}});
    res.json({code: 200, data: sections})
}

const updateSections = async(req,res) => {
    const sections = await section.update(req.body, {
      where: { id: req.body.section_id } 
    });
    res.json({code: 200, data: sections})
}

module.exports = {
    createSection,
    deleteSection,
    reviewSectionByPaperID,
    reviewSectionsCheck,
    updateSections
}