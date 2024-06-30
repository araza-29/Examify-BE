const db = require('../Model')
const user = db.user

const createUser = async(req,res) => {
    const userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role_id: req.body.role_id
    }
    const users = await user.create(userInfo)
    res.json(200).send(users)
}

const updateUser = async(req,res) => {
    const users = await user.update(req.body)
    res.json(200).send(users)
}

const deleteUser = async(req,res) => {
    const users = await user.update({status:false},{where:{id:req.paramas.id}})
    res.json(200).send("User deleted !")
}

const reviewUser = async(req,res) => {
    const users = await user.findOne({where:{id:req.paramas.id}})
    res.json(200).send(users)
}

const loginUser = async(req,res) => {
    const user = await user.findOne({where:{email:req.body.email, password:req.body.password}})
    if(user === NULL) {
        res.json(300).send("USER NOT FOUND !")
    }
    else {
        res.json(200).send(user)
    }
}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    reviewUser,
    loginUser,
}