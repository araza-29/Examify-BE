const db = require('../Model')
const paper = db.paper
const subject = db.subject
const classes = db.class
const center = db.center
const user = db.user
const userPapers = db.userPapers

const createPaper = async(req,res) => {
    const paperInfo = {
        subject_id: req.body.subject_id,
        user_id: req.body.user_id,
        month: req.body.month,
        completed: req.body.completed,
        instruction: req.body.instruction,
        date: req.body.date,
        due_date: req.body.due_date,
        type: req.body.type,
        year: req.body.year,
        marks: req.body.marks,
        duration: req.body.duration,
    }
    const papers = await paper.create(paperInfo)
    res.json({code: 200, data:papers})
}

const updatePaper = async(req,res) => {
    const papers = await paper.update(req.body, {where: {id: req.body.paper_id}})
    res.json({code:200, data: papers})
}

const deletePaper = async(req,res) => {
    const papers = await paper.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("Paper deleted !")
}

const reviewAllPaper = async(req,res) => {
    const papers = await paper.findAll({where:{},
    include: [
          {
            model: subject,
            attributes: ["name"]
          },
          {
            model: classes,
            attributes: ["name"],
            include: [{
                model: center,
                attributes: ["name"],
            }]
          }
        ],
        raw: true,
        nest: true})
    if(papers) {
        console.log(papers)
        const transformedData = papers.map(item => {
            return {
                ...item,
                class_name: item.class_.name,
                subject_name: item.subject.name,
                center_name: item.class_.center.name,
                date: item.date ? item.date.split('-').reverse().join('-') : null,
                due_date: item.due_date ? item.due_date.split('-').reverse().join('-') : null,
                class_: undefined,
                subject: undefined
            };
        });
        console.log(transformedData);
        res.json({code: 200, data: transformedData});
        }
}

const reviewAllPaperByUserID = async(req,res) => {
    const papers = await paper.findAll({
        where: {},
        include: [
        { 
            model: userPapers,
            where: { user_id: req.body.user_id },  // match user.id
            attributes: [] 
        },
          {
            model: subject,
            attributes: ["name"]
          },
          {
            model: classes,
            attributes: ["name"],
            include: [{
                model: center,
                attributes: ["name"],
            }]
          }
        ],
        raw: true,
        nest: true
      });
      if(papers) {
        console.log(papers)
        const transformedData = papers.map(item => {
            return {
                ...item,
                class_name: item.class_.name,
                subject_name: item.subject.name,
                center_name: item.class_.center.name,
                date: item.date ? item.date.split('-').reverse().join('-') : null,
                due_date: item.due_date ? item.due_date.split('-').reverse().join('-') : null,
                class_: undefined,
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
    reviewAllPaper,
    reviewAllPaperByUserID
}