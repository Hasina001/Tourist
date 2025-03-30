const mongoose = require('mongoose'); 

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    decription:String,
    coverImg:String,
    content:{
        type:Object,
        required:true
    },
    author:String,
    rating:Number,
    createdAt:{
        type:Date,
        required:true
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;