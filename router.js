const answerController = require('./controllers/answerController')
const centerController = require('./controllers/centerController')
const chapterController = require('./controllers/chapterController')
const checkersController = require('./controllers/checkersController')
const choicesController = require('./controllers/choicesController')
const classController = require('./controllers/classController')
const mcqsController = require('./controllers/mcqsController')
const questionController = require('./controllers/questionController')
const rolesController = require('./controllers/rolesController')
const subjectController = require('./controllers/subjectController')
const topicController = require('./controllers/topicController')
const userController = require('./controllers/userController')

const router = require("express").Router()

// Answer
router.post("/createAnswer",answerController.createAnswer)
router.post("/deleteAnswer",answerController.deleteAnswer)
router.post("/reviewAnswer",answerController.reviewAnswer)
router.post("/updateAnswer",answerController.updateAnswer)

// Center
router.post("/createcenter",centerController.createCenter)
router.post("/deletecenter",centerController.deleteCenter)
router.post("/reviewcenter",centerController.reviewCenter)
router.post("/updatecenter",centerController.updateCenter)

// Chapter
router.post("/createChapter",chapterController.createChapter)
router.post("/deleteChapter",chapterController.deleteChapter)
router.post("/reviewChapter",chapterController.reviewChapter)
router.post("/updateChapter",chapterController.updateChapter)

// Checker
router.post("/createCheckers",checkersController.createCheckers)
router.post("/deleteCheckers",checkersController.deleteCheckers)
router.post("/reviewCheckers",checkersController.reviewCheckers)
router.post("/updateCheckers",checkersController.updateCheckers)

// Choices
router.post("/createChoices",choicesController.createChoices)
router.post("/deleteChoices",choicesController.deleteChoices)
router.post("/reviewChoices",choicesController.reviewChoices)
router.post("/updateChoices",choicesController.updateChoices)

// Class
router.post("/createClass",classController.createClass)
router.post("/deleteClass",classController.deleteClass)
router.post("/reviewClass",classController.reviewClass)
router.post("/updateClass",classController.updateClass)

// Mcqs
router.post("/createMcqs",mcqsController.createMcqs)
router.post("/deleteMcqs",mcqsController.deleteMcqs)
router.post("/reviewMcqs",mcqsController.reviewMcqs)
router.post("/updateMcqs",mcqsController.updateMcqs)

// Question
router.post("/createQuestion",questionController.createQuestion)
router.post("/deleteQuestion",questionController.deleteQuestion)
router.post("/reviewQuestion",questionController.reviewQuestion)
router.post("/updateQuestion",questionController.updateQuestion)

// Roles
router.post("/createRoles",rolesController.createRoles)
router.post("/deleteRoles",rolesController.deleteRoles)
router.post("/reviewRoles",rolesController.reviewRoles)
router.post("/updateRoles",rolesController.updateRoles)

// Subject
router.post("/createSubject",subjectController.createSubject)
router.post("/deleteSubject",subjectController.deleteSubject)
router.post("/reviewSubject",subjectController.reviewSubject)
router.post("/updateSubject",subjectController.updateSubject)

// Topic
router.post("/createTopic",topicController.createTopic)
router.post("/deleteTopic",topicController.deleteTopic)
router.post("/reviewTopic",topicController.reviewTopic)
router.post("/updateTopic",topicController.updateTopic)

// User
router.post("/createUser",userController.createUser)
router.post("/deleteUser",userController.deleteUser)
router.post("/reviewUser",userController.reviewUser)
router.post("/updateUser",userController.updateUser)

module.exports = router