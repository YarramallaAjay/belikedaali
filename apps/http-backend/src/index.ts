import express from 'express';
import jwt from 'jsonwebtoken';
import {AuthUser} from './AuthUser';
import {JWTTOKEN} from "@repo/backend-common/config"
import {createRoomSchema, createUserSchema, signInSchema} from '@repo/common/zodSchema'
import bcrypt from 'bcrypt';
import {prismaClient} from '@repo/db/prisma'
const app=express();
app.use(express.json());


app.post('/signup',async (req,res)=>{

   const parsedReq=createUserSchema.safeParse(req.body);
   if(!parsedReq.success){
    console.log(parsedReq.error);
    res.status(400).send('Invalid inputs');
    return ;
   }
   const hashedPassword=await bcrypt.hash(parsedReq.data.password,10);
   const user=await prismaClient.user.create({
    data:{name:parsedReq.data.username,
    password:hashedPassword,
    email:parsedReq.data.email}
   })
   console.log(user.id);

   

   res.send("Signup successful.login now");
})

app.post('/signin',async (req,res)=>{
    const parsedReq=signInSchema.safeParse(req.body);
    if(!parsedReq.success){
        console.log(parsedReq.error);
        res.status(400).send('Invalid inputs');
        return ;
    }

    const user=await prismaClient.user.findFirst({where:{name:req.body.username}});
    if(!user){
        res.status(401).send('User not found');
        return;
    }

    await bcrypt.compare(parsedReq.data.password,user.password,function(err,hash){
        if(err){
            res.status(401).send("Invalid password")
        }
    })
    console.log(JWTTOKEN)
    const jwtToken=jwt.sign({
        username:parsedReq.data.username,
        userId:user.id
    },JWTTOKEN);
    res.json(jwtToken);
})

app.post('/createroom',AuthUser,async (req,res)=>{

    const parsedReq=createRoomSchema.safeParse(req.body);
    if(!parsedReq.success){
        console.log(parsedReq.error);
        res.status(400).send('Invalid inputs');
        return ;
    }
    console.log(parsedReq.data)
     const newRoom=await prismaClient.room.create({
        data:{
            slug:parsedReq.data.slug,
            //@ts-ignore
            adminId:req.userId

        }
    })
    //TODO:DB call to create room
    res.status(200).json(newRoom.id);
})

app.get("/chats/:roomId",async (req,res)=>{
    const roomId=Number(req.params.roomId)
    if(!roomId){
        res.json("room Id not found")
        return
    }
    const messages=await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"asc"},
        take:50
    })
    console.log(messages)

    res.json(messages)
})


app.get("/room/:slug",async (req,res)=>{
    const slug=req.params.slug
    if(!slug){
        res.json("slug not found")
        return
    }
    const room=await prismaClient.room.findFirst({
        where:{
            slug
        }
    })
    console.log(room)

    res.json(room)
})


    app.listen(3001,()=>{
        console.log('Server is running on port 3001');
    })
