const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

//parse option
app.use(express.json());
app.use(cors());

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);

    app.get('/', async(req,res)=>{
        res.send('hello')
    });
};


app.listen(port, ()=>{
    console.log(' server listning on port ');
}); 


//route