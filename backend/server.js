const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./auth');
const Post = require('./models/Post');
const User = require('./models/User');


app.use(cors());
app.use(bodyParser.json());
app.use('/auth',auth.router);

mongoose.connect('mongodb+srv://anna:TEVSnIadH5jey7Da@cluster0.b77ea.mongodb.net/mongooz2?retryWrites=true&w=majority',(err)=>{
   if(!err) console.log("success");
})




app.get('/',(req,res)=>{
    res.send('');
})

app.get('/posts/:id',async (req,res)=>{
    const author = req.params.id;
    const posts = await Post.find({author});
    res.send(posts);
})

app.post('/post',auth.checkAuthenticated, async (req,res)=>{
    const postData = req.body;
    postData.author= req.userId;
    const post = new Post(postData);
    await post.save((err,result)=>{
        if(err) return res.status(500).send({message:'saving post error'});    
        
    })
    res.sendStatus(200);
});

app.get('/users', auth.checkAuthenticated,async(req,res)=>{
    try{

        const user= await User.find({},"-pwd -__v");
        res.send(user);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})

app.get('/profile/:id',async(req,res)=>{
    
    try{
        const user = await User.findById(req.params.id,"-pwd -__v");
        res.json(user).status(200);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})





app.listen(process.env.port ||3000)
