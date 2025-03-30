const express = require('express');
const model = require('../model/blog.model');

const router = express.Router();

//creat a post
router.post('/creat-post', async (req,res)=>{
    try {
        const newPost = new model.find({...req.body});
        await newPost.save();

        res.status(200).send({
            message:"Post created succedddfully",
            post:newPost
        });

    } catch (err) {
        console.error("Error while creating post", err);
        res.status(500).send({message:"Error while creating post"});
    }
});

//get all blog
router.get('/', async (req,res)=>{
    try {
        
        const {search,category,location} = req.query;
        let query = {};

        if (search) {
            query = {
                ...query,
                $or:[
                    {title:{$regex:search,$option:"i"}},
                    {content:{$regex:search,$option:"i"}}
                ]
            }
        };

        if (category) {
            query = {
                ...query,
                category
            }
        };

        if (location) {
            query = {
                ...query,
                location
            }
        };

        const post = await model.find(query).sort({createdAt:-1});
        res.status(200).send({
            message:"Post retrived successfully",
            post:post
        })


    } catch (err) {
        console.error("Error while featching all post", err);
        res.status(500).send({message:"Error while featching all post"});
    }
});

//get a Single post by Id
router.get('/:id', async (req,res)=>{
    try {
        const postId = req.params.id;
        const post = await model.findById(postId);
        if(!post){
            return res.status(404).send({message:"Post not found"});
        };
        res.status(200).send({
            message:"Post retrived successfully",
            post:post
        });
    } catch (err) {
        console.error("Error while featching post", err);
        res.status(500).send({message:"Error while featching post"});
    }
});

//Update a post
router.patch('/update/:id', async (req,res)=>{
    try {
        const postId = req.params.id;
        const updatedPost = await model.findByIdAndUpdate(postId,{...req.body},{new:true});
        if (!updatedPost) {
            return res.status(404).send({message:"Post not foound"});
        };
        res.status(200).send({
            message:"Post updated successfully",
            post:updatedPost
        });
        
    } catch (err) {
        console.error("Error while updating post", err);
        res.status(500).send({message:"Error while updating post"});
    }
});

//Delete a post
router.delete('/delete/:id', async (req,res)=>{
    try {
        const postId = req.params.id;
        const post = await model.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).send({message:"Post not found"});
        };
        res.status(200).send({
            message:"Post deleted successfully",
            post:post
        });

    } catch (err) {
        console.error("Error while deleting post", err);
        res.status(500).send({message:"Error while deleting post"});
    }
});

//Related post
router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).send({message:"Post id is required"});
        };
        const blog = await model.findById(id);
        if (!blog) {
            return res.status.send({message:"Post not found"});
        };

        const titleRegex = new RegExp(blog.title.split(' ').join('|'),"i");
        const relatedQuery = {
            _id:{$ne:id},
            title:{$regex:titleRegex}
        };
        const relatedPost = await model.findById(relatedQuery);
        res.status(200).send({
            message:"Post relayed successfully",
            post:relatedPost
        });

    } catch (err) {
        console.error("Error while featching all post", err);
        res.status(500).send({message:"Error while featching all post"});
    }
});


module.exports = router;