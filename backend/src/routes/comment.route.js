const express = require('express');
const comment = require('../model/comment.model');

const router = express.Router();

//creat a comment
router.post('/creat-comment', async (req,res)=>{
    try {
        const newComment = new comment.find({...req.body});
        await newComment.save();
        res.status(200).send({
            message:"Comment created successfully",
            comment:newComment
        });

    } catch (err) {
        console.error("Error while creating comment", err);
        res.status(500).send({message:"Error while creating comment"});
    }
});

//get total count comment
router.get('/total-comment', async (req,res)=>{
    try {
        const TotalComment = await comment.countDocuments();
        res.status(200).send({
            message:"Total count comment",
            TotalComment
        });
    } catch (err) {
        console.error("Error while counting all comment", err);
        res.status(500).send({message:"Error while counting all comment"});
    }
});

module.exports = router;