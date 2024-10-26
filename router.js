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
const paperController = require('./controllers/paperController')
const keyController = require('./controllers/keyControllers')
const questionMappingController = require('./controllers/questionMappingCotroller')
const section = require('./controllers/section.Controller')

const router = require("express").Router()

//Image Uploader

const multer = require('multer')
const upload = multer ({
    storage:multer.diskStorage({
        destination: function(req,file,callBack) {
            callBack(null, "file")
        },
        filename: function(req,file,callBack) {
            callBack(null, file.fieldname+".jpg")
        }
    })
}).single("user.file")
// Answer
router.post("/createAnswer",answerController.createAnswer)
router.post("/deleteAnswer",answerController.deleteAnswer)
router.post("/reviewAnswer",answerController.reviewAnswer)
router.post("/updateAnswer",answerController.updateAnswer)
router.post("/getAnswer",answerController.getAnswer)

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
router.post("/reviewChaptersBySubjectId",chapterController.reviewChapterBySubjectId)

// Checker
router.post("/createCheckers",checkersController.createCheckers)
router.post("/deleteCheckers",checkersController.deleteCheckers)
router.post("/reviewCheckers",checkersController.reviewCheckers)
router.post("/updateCheckers",checkersController.updateCheckers)
router.post("/reviewCheckers",checkersController.reviewCheckers)

// Choices
router.post("/createChoices",choicesController.createChoices)
router.post("/deleteChoices",choicesController.deleteChoices)
router.post("/reviewChoices",choicesController.reviewChoices)
router.post("/reviewChoice",choicesController.reviewChoice)
router.post("/updateChoices",choicesController.updateChoices)

// Class
router.post("/createClass",classController.createClass)
router.post("/deleteClass",classController.deleteClass)
router.post("/reviewClass",classController.reviewClass)
router.post("/updateClass",classController.updateClass)
router.post("/reviewClasses",classController.reviewClasses)

// Mcqs
router.post("/createMCQ",mcqsController.createMcqs)
router.post("/deleteMCQ",mcqsController.deleteMcqs)
router.post("/reviewMCQByUserID",mcqsController.reviewMcqsByUserID)
router.post("/reviewMCQBySubjectID",mcqsController.reviewMcqsBySubjectID)
router.post("/updateMCQ",mcqsController.updateMcqs)
router.post("/reviewMCQ",mcqsController.reviewMcq)

// Question
router.post("/createQuestion",upload,(req,res)=>{
    questionController.createQuestion(req,res)
})
router.post("/deleteQuestion",questionController.deleteQuestion)
router.post("/reviewQuestion",questionController.reviewQuestion)
router.post("/reviewQuestionsBySubjectID",questionController.reviewQuestionsBySubjectId)
router.post("/updateQuestion",questionController.updateQuestion)
router.post("/reviewEveryDetailsQuestionsByUserID",questionController.reviewEveryDetailsQuestionsByUserId)

// Roles
router.post("/createRoles",rolesController.createRoles)
router.post("/deleteRoles",rolesController.deleteRoles)
router.post("/reviewRoles",rolesController.reviewRoles)
router.post("/updateRoles",rolesController.updateRoles)

// Subject
router.post("/createSubject",subjectController.createSubject)
router.post("/deleteSubject",subjectController.deleteSubject)
router.post("/reviewSubjectsByUserID",subjectController.reviewSubjectByUserID)
router.post("/updateSubject",subjectController.updateSubject)
router.post("/reviewSubjectsByClassID",subjectController.reviewSubjectsByClassID)

// Topic
router.post("/createTopic",topicController.createTopic)
router.post("/deleteTopic",topicController.deleteTopic)
router.post("/reviewTopic",topicController.reviewTopic)
router.post("/reviewTopicsByChapterId",topicController.reviewTopicsbychapterId)
router.post("/updateTopic",topicController.updateTopic)

// User
router.post("/createUser",userController.createUser)
router.post("/deleteUser",userController.deleteUser)
router.post("/reviewUser",userController.reviewUser)
router.post("/updateUser",userController.updateUser)
router.post("/loginUser",userController.loginUser)

// Paper 
router.post("/createPaper",paperController.createPaper)
router.post("/updatePaper",paperController.updatePaper)
router.post("/deletePaper",paperController.deletePaper)
router.post("/reviewPaper",paperController.reviewPaper)

// Key
router.post('/createKey',keyController.createKey)
router.post('/deleteKey',keyController.deleteKey)
router.post('/reviewKey',keyController.reviewKey)
router.post('/updateKey',keyController.updateKey)

// Question Mapping
router.post('/createQuestionMapping',questionMappingController.createQuestionMapping)
router.post('/deleteQuestionMapping',questionMappingController.deleteQuestionMapping)
router.post('/reviewPaper',questionMappingController.reviewPaper)
router.post('/reviewPastPaperQuestions',questionMappingController.reviewPastPaperQuestions)
router.post('/reviewQuestionMapping',questionMappingController.reviewQuestionMapping)
router.post('/updateQuestionMapping',questionMappingController.updateQuestionMapping)

//Section
router.post('/createSection',section.createSection)
router.post('/deleteSection',section.deleteSection)
router.post('/reviewSectionByPaperID',section.reviewSectionByPaperID)


module.exports = router