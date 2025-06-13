const { noTrueLogging } = require('sequelize/lib/utils/deprecations')
const config = require('./config')
const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize (
    config.DB,
    config.USER,
    config.PASSWORD, {
        host:config.HOST,
        dialect:config.dialect
    },
)

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync({ alter: true })
.then(()=>{
    console.log("re-sync done!")
})

db.center = require('./models/center')(sequelize,DataTypes)
db.cchapter = require('./models/cchapter')(sequelize,DataTypes)
db.ctopic = require('./models/ctopic')(sequelize,DataTypes)
db.teacher = require('./models/teacher')(sequelize,DataTypes)
db.u_role = require('./models/u_role')(sequelize,DataTypes)
db.roles = require('./models/roles')(sequelize,DataTypes)
db.user = require('./models/user')(sequelize,DataTypes)
db.topic = require('./models/topic')(sequelize,DataTypes)
db.class = require('./models/class')(sequelize,DataTypes)
db.subject = require('./models/subject')(sequelize,DataTypes)
db.questions = require('./models/questions')(sequelize,DataTypes)
db.mcqs = require('./models/mcqs')(sequelize,DataTypes)
db.choices = require('./models/choices')(sequelize,DataTypes)
db.answer = require('./models/answer')(sequelize,DataTypes)
db.checkers = require('./models/checkers')(sequelize,DataTypes)
db.chapter = require('./models/chapter')(sequelize,DataTypes)
db.paper = require('./models/paper')(sequelize,DataTypes)
db.key = require('./models/key')(sequelize,DataTypes)
db.questionMapping = require('./models/questionMapping')(sequelize, DataTypes)
db.section = require('./models/section')(sequelize,DataTypes)


// Class
db.center.hasMany(db.class, {
    foreignKey: 'center_id'
})
db.class.belongsTo(db.center, {
    foreignKey: 'center_id'
})

//Section
db.paper.hasMany(db.section,{
    foreignKey: 'paper_id'
})
db.section.belongsTo(db.paper,{
    foreignKey: 'paper_id'
})

// Subject
db.center.hasMany(db.subject, {
    foreignKey: 'center_id'
})
db.subject.belongsTo(db.center, {
    foreignKey: 'center_id'
})



// Chapter
db.subject.hasMany(db.cchapter, {
    foreignKey: 'subject_id'
})
db.cchapter.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})

db.center.hasMany(db.cchapter, {
    foreignKey: 'center_id'
})
db.cchapter.belongsTo(db.center, {
    foreignKey: 'center_id'
})

db.class.hasMany(db.cchapter, {
    foreignKey: 'class_id'
})
db.cchapter.belongsTo(db.class, {
    foreignKey: 'class_id'
})

// Topic
db.cchapter.hasMany(db.ctopic, {
    foreignKey: 'chapter_id'
})
db.ctopic.belongsTo(db.cchapter, {
    foreignKey: 'chapter_id'
})

db.center.hasMany(db.ctopic, {
    foreignKey: 'center_id'
})
db.ctopic.belongsTo(db.center, {
    foreignKey: 'center_id'
})


// Questions
db.ctopic.hasMany(db.questions, {
    foreignKey: 'topic_id'
})
db.questions.belongsTo(db.ctopic, {
    foreignKey: 'topic_id'
})


// Answer
db.questions.hasMany(db.answer, {
    foreignKey: 'question_id'
})
db.answer.belongsTo(db.questions, {
    foreignKey: 'question_id'
})

// MCQs
db.ctopic.hasMany(db.mcqs, {
    foreignKey: 'topic_id'
})
db.mcqs.belongsTo(db.ctopic, {
    foreignKey: 'topic_id'
})

// Choices
db.mcqs.hasMany(db.choices, {
    foreignKey: 'mcqs_id'
})
db.choices.belongsTo(db.mcqs, {
    foreignKey: 'mcqs_id'
})

// Checkers

db.user.hasMany(db.checkers, {
    foreignKey: 'user_id'
})
db.checkers.belongsTo(db.user, {
    foreignKey: 'user_id'
})

db.subject.hasMany(db.checkers, {
    foreignKey: 'subject_id'
})
db.checkers.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})

db.questions.hasMany(db.checkers, {
    foreignKey: 'question_id'
})
db.checkers.belongsTo(db.questions, {
    foreignKey: 'question_id'
})

// Key

db.paper.hasOne(db.key, {
    foreignKey: 'paper_id'
})
db.key.belongsTo(db.paper, {
    foreignKey: 'paper_id'
})
// paper

db.subject.hasMany(db.paper, {
    foreignKey: 'subject_id'
})
db.paper.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})

db.class.hasMany(db.paper, {
    foreignKey: 'class_id'
})
db.paper.belongsTo(db.class, {
    foreignKey: 'class_id'
})

db.user.hasMany(db.paper, {
    foreignKey: 'user_id'
})
db.paper.belongsTo(db.user, {
    foreignKey: 'user_id'
})
//questionMapping

db.paper.hasMany(db.questionMapping, {
    foreignKey: 'paper_id'
})
db.questionMapping.belongsTo(db.paper, {
    foreignKey: 'paper_id'
})

db.questions.hasMany(db.questionMapping, {
    foreignKey: 'question_id'
})
db.questionMapping.belongsTo(db.questions, {
    foreignKey: 'question_id'
})
db.mcqs.hasMany(db.questionMapping, {
    foreignKey: 'mcqs_id'
})
db.questionMapping.belongsTo(db.mcqs, {
    foreignKey: 'mcqs_id'
})
db.section.hasMany(db.questionMapping, {
    foreignKey: 'section_id'
})
db.questionMapping.belongsTo(db.section, {
    foreignKey: 'section_id'
})

//Teacher

db.center.hasMany(db.teacher, {
    foreignKey: 'center_id'
})
db.teacher.belongsTo(db.center, {
    foreignKey: 'center_id'
})

db.user.hasMany(db.teacher, {
    foreignKey: 'user_id'
})
db.teacher.belongsTo(db.user, {
    foreignKey: 'user_id'
})

db.subject.hasMany(db.teacher, {
    foreignKey: 'subject_id'
})
db.teacher.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})

module.exports = db