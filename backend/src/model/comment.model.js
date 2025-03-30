const mongoose = require('mongoose'); 

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BLog',
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
});

const comment = mongoose.model('Blog', commentSchema);

module.exports = comment;