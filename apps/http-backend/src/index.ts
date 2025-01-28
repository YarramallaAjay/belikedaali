import express from 'express';
import jwt from 'jsonwebtoken';
import {AuthUser} from './AuthUser';
import {JWTTOKEN} from '@repo/backend-common/config';
import {createUserSchema} from '@repo/common/zodSchema'

const app=express();
app.use(express.json());

app.get('/signup',(req,res)=>{

   const parsedReq=createUserSchema.safeParse(req.body);
   if(!parsedReq.success){
    console.log(parsedReq.error);
    res.status(400).send('Invalid inputs');
    return ;
   }
   const jwtToken=jwt.sign({
    username:parsedReq.data.username
   },JWTTOKEN);

   res.send(jwtToken);
})

app.post('/signin',function(req,res){
    const {username,password}=req.body;
    const jwtToken=jwt.sign({
        username:username
    },JWTTOKEN);
    res.send(jwtToken);
})

app.post('/create-room,',AuthUser,(req,res)=>{
    res.send('Room Created');
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})