import mongoose from "mongoose";

// CREATING A NEW SCHEMA FOR BOOK
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// CREATING BOOK MODEL

const Book= mongoose.model('Book',bookSchema)
export default Book;