const db = require('../Model')
const feedback = db.feedback
const subject = db.subject
const classes = db.class

const createFeedback = async(req,res) => {
    const feedbackInfo = {
        user_id: req.body.user_id,
        review: req.body.review,
        paper_id: req.body.paper_id
    }
    const feedbacks = await feedback.create(feedbackInfo)
    res.json({code: 200, data:feedbacks})
}

const updateFeedback = async(req,res) => {
    const feedbacks = await feedback.update(req.body, {where: {id: req.body.feedback_id}})
    res.json({code:200, data: feedbacks})
}

const deleteFeedback = async(req,res) => {
    const feedbacks = await feedback.update({status: false},{where:{id:req.paramas.id}})
    res.json(200).send("feedback deleted !")
}

const reviewFeedbackByPaperID = async(req,res) => {
    const feedbacks = await feedback.findAll({where:{paper_id: req.body.paper_id}})
    res.json({code: 200, data: feedbacks})
}

module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    reviewFeedbackByPaperID
}