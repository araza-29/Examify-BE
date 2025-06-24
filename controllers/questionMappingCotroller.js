const db = require("../Model");
const { Op } = require("sequelize");
const questionMapping = db.questionMapping;
const questions = db.questions;
const mcqs = db.mcqs;
const answer = db.answer

const createQuestionMapping = async (req, res) => {
  const info = {
    paper_id: req.body.paper_id,
    question_id: req.body.question_id,
    mcqs_id: req.body.mcqs_id,
    section_id: req.body.section_id,
  };
  const mapping = await questionMapping.create(info);
  res.json({ code: 200, data: mapping });
};

const updateQuestionMapping = async (req, res) => {
  const mapping = await questionMapping.update(req.body);
  res.json(200).send(mapping);
};

const deleteQuestionMapping = async (req, res) => {
  const result = await questionMapping.destroy({
    where: {
      paper_id: req.body.paper_id,
      question_id: req.body.question_id
    }
  });
  res.json({code: 200, data: "Mapping deleted! "});
};

const deleteMCQMapping = async (req, res) => {
  const result = await questionMapping.destroy({
    where: {
      paper_id: req.body.paper_id,
      mcqs_id: req.body.mcq_id
    }
  });
  res.json({code: 200, data: "Mapping deleted! "});
};

const reviewQuestionMapping = async (req, res) => {
  const mapping = await questionMapping.findOne({
    where: { id: req.paramas.id },
  });
  res.json(200).send(mapping);
};


const reviewQuestionsByPaperID = async (req, res) => {
    try {
      const mapping = await questionMapping.findAll({
        where: { paper_id: req.body.paper_id },
        include: [{ model: questions, required: true}],
      });
  
      const transformedData = mapping.map((item) => {
        const plainItem = item.toJSON();
        return {
          ...plainItem,
          id: plainItem.question.id,
          name: plainItem.question.name,
          marks: plainItem.question.marks,
          image: plainItem.question.image,
        };
      });
  
      console.log(transformedData);
  
      res.json({
        code: 200,
        data: transformedData,
        message: "Mappings retrieved successfully",
      });
  
    } catch (error) {
      console.error("Error in reviewQuestionsByPaperID:", error);
      res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
  };

  const reviewQuestionsWithAnswerByPaperID = async (req, res) => {
    try {
      const mapping = await questionMapping.findAll({
        where: { paper_id: req.body.paper_id },
        include: [{ model: questions, required: true , include:[{model: answer, required: true}]}],
      });
  
      const transformedData = mapping.map((item) => {
        const plainItem = item.toJSON();
        return {
          ...plainItem,
          id: plainItem.question.id,
          name: plainItem.question.name,
          marks: plainItem.question.marks,
          image: plainItem.question.image,
          answer: plainItem.question.answers[0].answer,
          answers: undefined,
          question: undefined
        };
      });
  
      console.log(transformedData);
  
      res.json({
        code: 200,
        data: transformedData,
        message: "Mappings retrieved successfully",
      });
  
    } catch (error) {
      console.error("Error in reviewQuestionsByPaperID:", error);
      res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
  };
  
  const reviewMCQsByPaperID = async (req, res) => {
    try {
      const mapping = await questionMapping.findAll({
        where: { paper_id: req.body.paper_id },
        include: [{ model: mcqs, required: true }],
      });
  
      const transformedData = mapping.map((item) => {
        const plainItem = item.toJSON();
        return {
          ...plainItem,
          id: plainItem.mcq.id,
          name: plainItem.mcq.name,
          choice1: plainItem.mcq.choice1,
          choice2: plainItem.mcq.choice2,
          choice3: plainItem.mcq.choice3,
          choice4: plainItem.mcq.choice4,
          answer: plainItem.mcq.answer,
          mcq: undefined
        };
      });
  
      console.log(transformedData);
  
      res.json({
        code: 200,
        data: transformedData,
        message: "Mappings retrieved successfully",
      });
  
    } catch (error) {
      console.error("Error in reviewMCQsByPaperID:", error);
      res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
  };
  

const reviewPastPaperQuestions = async (req, res) => {
  const mapping = await questionMapping.findAll({
    where: { question_id: req.body.question_id },
  });
  res.json(200).send(mapping);
};

module.exports = {
  createQuestionMapping,
  updateQuestionMapping,
  deleteQuestionMapping,
  deleteMCQMapping,
  reviewQuestionsByPaperID,
  reviewQuestionsWithAnswerByPaperID,
  reviewMCQsByPaperID,
  reviewPastPaperQuestions,
  reviewQuestionMapping,
};
