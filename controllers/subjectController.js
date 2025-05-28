const db = require('../Model')
const subject = db.subject

const createSubject = async(req,res) => {
    const subjectInfo = {
        name: req.body.name,
        class_id: req.body.class_id,
        user_id: req.body.user_id
    }

    const subjects = await subject.create(subjectInfo)
    res.json(200).send(subjects)
}

const updateSubject = async(req,res) => {
    const subjects = await subject.update(req.body)
    res.json(200).send(subjects)
}

const deleteSubject = async(req,res) => {
    const subjects = await subject.update({status: false}, {where:{id:req.paramas.id}})
    res.json(200).send("Subject deleted !")
}

const reviewSubjectByUserID = async(req,res) => {
    const subjects = await subject.findAll({where:{user_id: req.body.user_id}})
    res.json({code: 200, data: subjects});
}

const reviewSubjectsByClassID = async(req,res) => {
    let class_id = req.body.class_id
    let user_id = req.body.user_id

    const subjects = await teacher.findAll({include:[{model:subject, required:true, attributes:['name']}], attributes: ['subject_id'], where: {user_id: user_id, class_id: class_id},raw:true})
    const result = subjects.map(item=>{
        return {
            name:item["subject.name"],
            id: item["subject_id"]
        };
    });

    if(result){
        return res.json({code:200,status:true,message:"data found",data: result})
    
    }else{

        return res.json({code:400,status:false,message:"data not found",data:[]})
    
    }
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    reviewSubjectByUserID,
    reviewSubjectsByClassID
}