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

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Basic configuration first to test file upload
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            console.log('Processing file:', file);
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    // Add limits for debugging
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    // Add debugging to fileFilter
    fileFilter: function (req, file, cb) {
        console.log('Received file in filter:', {
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype
        });
        cb(null, true);
    }
}).single('file');

// Route to create a question
router.post('/createQuestion', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        console.log('Uploaded file:', req.file);

        // Call the controller to create the question
        questionController.createQuestion(req, res).then((result) => {
            const questionId = result.id; // Get the ID from the controller
            console.log('Question created with ID:', questionId);

            if (req.file) {
                const oldPath = req.file.path; // Path of the temporary file
                const newPath = path.join('uploads', `${questionId}${path.extname(req.file.originalname)}`);

                // Rename the file to match the question ID
                fs.rename(oldPath, newPath, (renameErr) => {
                    if (renameErr) {
                        console.error('Error renaming file:', renameErr);
                        return res.status(500).json({ error: 'Failed to rename file' });
                    }

                    console.log('File renamed successfully:', newPath);
                });
            } else {
            }
        }).catch((dbErr) => {
            console.error('Error creating question:', dbErr);
        });
    });
});

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
router.post("/reviewClassesByUserID",classController.reviewClassesByUserID)

// Mcqs
router.post("/createMCQ",mcqsController.createMcqs)
router.post("/deleteMCQ",mcqsController.deleteMcqs)
router.post("/reviewMCQByUserID",mcqsController.reviewMcqsByUserID)
router.post("/reviewMCQBySubjectID",mcqsController.reviewMcqsBySubjectID)
router.post("/updateMCQ",mcqsController.updateMcqs)
router.post("/reviewMCQ",mcqsController.reviewMcq)

// Question
// router.post("/createQuestion", function(req, res) {
//     console.log('Headers:', req.headers);
    
//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             console.log('Multer error:', err);
//             return res.status(400).json({ error: err.message });
//         } else if (err) {
//             console.log('Unknown error:', err);
//             return res.status(500).json({ error: err.message });
//         }
        
//         // Log the entire request for debugging
//         console.log('Files:', req.files);
//         console.log('File:', req.file);
//         console.log('Body:', req.body);
        
//         questionController.createQuestion(req, res);
//     });
// });
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
router.post("/reviewAllPaperByUserID",paperController.reviewAllPaperByUserID)

// Key
router.post('/createKey',keyController.createKey)
router.post('/deleteKey',keyController.deleteKey)
router.post('/reviewKey',keyController.reviewKey)
router.post('/updateKey',keyController.updateKey)

// Question Mapping
router.post('/createQuestionMapping',questionMappingController.createQuestionMapping)
router.post('/deleteQuestionMapping',questionMappingController.deleteQuestionMapping)
router.post('/reviewQuestionsByPaperID',questionMappingController.reviewQuestionsByPaperID)
router.post('/reviewMCQsByPaperID',questionMappingController.reviewMCQsByPaperID)
router.post('/reviewPastPaperQuestions',questionMappingController.reviewPastPaperQuestions)
router.post('/reviewQuestionMapping',questionMappingController.reviewQuestionMapping)
router.post('/updateQuestionMapping',questionMappingController.updateQuestionMapping)

//Section
router.post('/createSection',section.createSection)
router.post('/deleteSection',section.deleteSection)
router.post('/reviewSectionByPaperID',section.reviewSectionByPaperID)
router.post('/reviewSectionCheck',section.reviewSectionsCheck)


module.exports = router