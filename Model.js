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
db.roles = require('./models/roles')(sequelize,DataTypes)
db.user = require('./models/users')(sequelize,DataTypes)
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

// User
db.roles.hasMany(db.user,{
    foreignKey:'role_id'
})
db.user.belongsTo(db.roles,{ foreignKey:'role_id' })


// Class
db.center.hasMany(db.class, {
    foreignKey: 'center_id'
})
db.class.belongsTo(db.center, {
    foreignKey: 'center_id'
})


// Subject
db.class.hasMany(db.subject, {
    foreignKey: 'class_id'
})
db.subject.belongsTo(db.class, {
    foreignKey: 'class_id'
})

db.user.hasMany(db.subject, {
    foreignKey: 'user_id'
})
db.subject.belongsTo(db.user, {
    foreignKey: 'user_id'
})


// Chapter
db.subject.hasMany(db.chapter, {
    foreignKey: 'subject_id'
})
db.chapter.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})


// Topic
db.chapter.hasMany(db.topic, {
    foreignKey: 'chapter_id'
})
db.topic.belongsTo(db.chapter, {
    foreignKey: 'chapter_id'
})


// Questions
db.topic.hasMany(db.questions, {
    foreignKey: 'topic_id'
})
db.questions.belongsTo(db.topic, {
    foreignKey: 'topic_id'
})
db.subject.hasMany(db.questions, {
    foreignKey: 'subject_id'
})
db.questions.belongsTo(db.subject, {
    foreignKey: 'subject_id'
})


// Answer
db.questions.hasMany(db.answer, {
    foreignKey: 'question_id'
})
db.answer.belongsTo(db.questions, {
    foreignKey: 'question_id'
})

// MCQs
db.topic.hasMany(db.mcqs, {
    foreignKey: 'topic_id'
})
db.mcqs.belongsTo(db.topic, {
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
    foreignKey: 'questions_id'
})
db.questionMapping.belongsTo(db.questions, {
    foreignKey: 'questions_id'
})
module.exports = db