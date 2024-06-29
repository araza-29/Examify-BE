const express = require('express')
const router = require('./router')

const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json())

app.use("/Examination",router)

app.listen(3000, ()=>{
    console.log("server is running")
})