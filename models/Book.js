import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
        maxLength:100,
        trim:true,
        index:true,
        unique:true
    },
    shortDescription:{
        type:String,
        required:false,
    },
    authors:[String],
    publishedDate:{
        type:Date,
        required:false
    },
    pageCount:Number,
    thumbnailUrl:String,
    

})

const BookModel = mongoose.model('Book',bookSchema)

export default BookModel;