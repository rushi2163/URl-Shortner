const express = require('express');
const app =express()
const URLrouter=require('./routs/url')
const staticHome=require('./routs/staticroute')
const {connectToMongoose} =require('./connection')
const path=require('path')
const PORT=8000
// const URL = 'mongodb://localhost:27017'
app.set('view engine','ejs')
app.set('views',path.resolve('./view'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
connectToMongoose('mongodb://localhost:27017/short-url').then((res)=>console.log("connected"))
app.listen(PORT,()=>{console.log('listening on port 8000');})
app.use('/',staticHome)
app.use('/url',URLrouter)
