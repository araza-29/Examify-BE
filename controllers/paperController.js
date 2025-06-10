const db = require('../Model')
const paper = db.paper
const subject = db.subject
const classes = db.class

const createPaper = async(req,res) => {
    const paperInfo = {
        subject_id: req.body.subject_id,
        user_id: req.body.user_id,
        month: req.body.month,
        completed: req.body.completed,
        instruction: req.body.instruction,
        date: req.body.date,
        year: req.body.year,
        marks: req.body.marks,
        duration: req.body.duration,
    }
    const papers = await paper.create(paperInfo)
    res.json({code: 200, data:papers})
}

const updatePaper = async(req,res) => {
    const papers = await paper.update({completed: req.body.completed}, {where: {id: req.body.paper_id}})
    res.json({code:200, data: papers})
}

const deletePaper = async(req,res) => {
    const papers = await paper.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Paper deleted !")
}

const reviewPaper = async(req,res) => {
    const papers = await paper.findOne({where:{id: req.body.paper_id}})
    res.json({code: 200, data: papers})
}

const reviewAllPaperByUserID = async(req,res) => {
    const papers = await paper.findAll({
        where: { user_id: req.body.user_id },
        include: [
          {
            model: subject,
            attributes: ["name"]
          },
          {
            model: classes,
            attributes: ["name"],
          }
        ],
        raw: true,
        nest: true
      });
      if(papers) {
        console.log(papers)
        const transformedData = papers.map(item => {
            return {
                class_name: item.class_.name,
                subject_name: item.subject.name,
                class: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
        }
}

module.exports = {
    createPaper,
    updatePaper,
    deletePaper,
    reviewPaper,
    reviewAllPaperByUserID
}