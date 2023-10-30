import express from 'express';
import mongoose from 'mongoose';
import { PORT,MongoURI } from './config.js';
import bookRoute from './Routes/bookRoute.js';
import cors from 'cors';

const app=express();
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    return res.status(200).json('Home Page')
})

// BOOK ROUTE TO WRITE CLEAN CODE WITH GOOD PRACTICE.
app.use('/book',bookRoute)

// CONNECTING TO MONGODB AND AFTER CONNECTION TO MONGODB IS ESTABLISHED THE SERVER IS STARTED.
mongoose.connect(MongoURI).then(()=>{
    console.log('Connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`Connected tO Server on port :${PORT}`)
    })
})