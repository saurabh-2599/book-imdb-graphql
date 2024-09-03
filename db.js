import mongoose from "mongoose";

(async function(params) {
    try{
        const result = await mongoose.connect(`mongodb://127.0.0.1:27017/books-imdb`)
        console.log("______Database connected successfully_____")
    }
    catch(err){
        console.log("__Database connection failed____")
    }
}())