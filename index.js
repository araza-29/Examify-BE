const express = require('express')
const router = require('./router')
const path = require('path');

const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/questions', express.static(path.join(__dirname, 'uploads/questions')));

app.use("/Examination",router)

app.listen(3000, ()=>{
    console.log("server is running")
})