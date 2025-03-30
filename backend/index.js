const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = 3000;

//parse option
app.use(express.json());
app.use(cors());


async function main(){
    try {
        await mongoose.connect('');

        app.get('/', async (req,res)=>{
            res.send('Hello')
        })

    } catch (err) {
        console.error("error connecting mongoose", err);
    }
};

app.listen(port, ()=>{
    console.log("Serveur listening on port");
});

//route
const BlogRoute = require('./src/routes');
const userRoute = require('./src/routes');
const commentRoute = require('./src/routes');

app.use('/api/blog', BlogRoute);
app.use('/api/user', userRoute);
app.use('/api/comment', commentRoute);
