import express from 'express';
import Book from '../Models/bookSchema.js';
const route = express.Router();

// ROUTING FILE FOR GOOD CODE AND FILE STRUCTURE


// INSERTING DATA INTO DATABASE USING POST METHOD
route.post('/', async (req, res) => {
    try{
        const isPresent = await Book.findOne({title:req.body.title})
        // IF DATA IS PRESENT IT WILL RETURN MESSAGE WITHOUT ADDING  ENTRY TO DATABASE
    if (isPresent) {
        return res.status(400).json({ message: 'Book already exists' })
    }
// CHECKS IF ALL THE PARAMETERS ARE PRESENT IN THE REQUEST BODY
    if (!req.body.title ||
        !req.body.author ||
        !req.body.summary) {
        return res.status(400).json({ message: 'All fields are required' });
    }

        // CREATED A NEW BOOK ENTRY IN THE DATABASE
    const newBook=await Book.create({title: req.body.title, author: req.body.author,summary: req.body.summary})
    return res.status(201).json(newBook);
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})

    }
})

// GET METHOD TO GET ALL THE DATA IN THE DATABASE
route.get('/',async(req,res)=>{
   try{
    // GETS ALL THE DATA FROM DATABASE
    const books =await Book.find({})
    // IF NO DATA IN DATABASE THEN RETURNS VALID RESPONSE 
    if(books.length===0){
        return res.status(404).json({message:'No books to display'})
    }
    // RETURNS DATA IF PRESENT IN THE DATABASE
    return res.status(200).json(books)

   }
   catch(err){
    console.log(err.message)
    return res.status(500).json({message:err.message})

   }
})

// GET METHOD TO GET DATA FROM DATABASE USING BOOK ID
route.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
     const book =await Book.findById(id)
     if(!book){
         return res.status(404).json({message:"Book not found"})
     }
     return res.status(200).json(book)
 
    }
    catch(err){
     console.log(err.message)
     return res.status(500).json({message:err.message})

    }
 })

// PUT METHOD TO UPDATE DATA ENTRY IN DATABASE
 route.put('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const findBook=await Book.findById(id);
        // RESPONSE MESSAGE IF BOOK IS NOT FOUND
        if(!findBook){
            return res.status(404).json({message:"Book to be updated does not exist"})
        }
        if(!req.body.title||
            !req.body.author||
            !req.body.summary){
                return res.status(400).json({message:'Enter all fields'})
            }
            // BOOK IS UPDATED AND RETURNED 
        const updatedBook=await Book.findByIdAndUpdate(id,req.body)
        return res.status(200).json({updatedBook:updatedBook,message:'Book successfully updated'})
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
 })

//  DELETE METHOD TO DELETE THE BOOK ENTRY BASED ON ID
 route.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const deletedBook=await Book.findByIdAndDelete(id)
        // RESPONSE IF BOOK IS NOT FOUND
        if(!deletedBook){
            return res.status(404).json({message:'Book to be deleted not found'})
        }
        return res.status(200).json({message:'Book was deleted successfully',
    deletedBook: deletedBook})

    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})

    }
 })

export default route;

