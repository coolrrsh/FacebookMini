const jwt=require('jwt-simple');
const bcrypt= require('bcrypt-nodejs');
const User = require('./models/User');
const express = require('express');
const router = express.Router();


    router.post('/register',async(req,res)=>{
        const userData=req.body;
        const newUser= new User(userData);
        await newUser.save((err,result)=>{
            if(err) return res.status(500).send({message:'Error saving user'}); 

            const payload={sub: newUser._id}
            const token = jwt.encode(payload,'123');
            res.status(200).send({token});

        })
    })

    router.post('/login',async(req,res)=>{
        const userData=req.body;
        const user= await User.findOne({email:userData.email});
        if(!user) return res.status(401).send({message: "Email or password invalid"});
        
        await bcrypt.compare(userData.pwd,user.pwd,(err,isMatch)=>{
            if(!isMatch) return res.status(401).send({message:'Email or Password invalid'});
            const payload={sub: user._id};
            const token=jwt.encode(payload,'123');
            res.status(200).send({token:token});
        })
    
    })

    checkAuthenticated=(req,res,next)=>{
        if(!req.header('authorization')) return res.status(401).send({message: 'Unauthorised: Missing Auth header'});
        const token= req.header('authorization').split(' ')[1];
        const payload= jwt.decode(token,'123');
        if(!payload) return res.status(401).send({message: 'Unauthorised: Invalid Auth header'});
        req.userId = payload.sub;
        next();
    }

    const auth = {
        router,
        checkAuthenticated,
        
    }

    module.exports =auth