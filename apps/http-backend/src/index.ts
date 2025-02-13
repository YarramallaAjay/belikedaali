import express from 'express';
import jwt from 'jsonwebtoken';
import {AuthUser} from './AuthUser';
import {JWTTOKEN} from "@repo/backend-common/config"
import {createRoomSchema, createUserSchema, signInSchema} from '@repo/common/zodSchema'
import bcrypt from 'bcrypt';
import {prismaClient} from '@repo/db/prisma'
import cors from 'cors';
import cookie from 'cookie'
const app=express();
app.use(express.json());

// const cook=cookie
app.use(cors())


app.post('/signup',async (req,res)=>{
    try{
        const parsedReq=createUserSchema.safeParse(req.body);
   if(!parsedReq.success){
    console.log(parsedReq.error);
    res.status(400).send('Invalid inputs');
    return ;
   }
   const userExisted=await prismaClient.user.findFirst({where:{email:parsedReq.data.email}})
   if(userExisted){
    const token=await jwt.sign({username:parsedReq.data.username,
        userId:userExisted.id
       },JWTTOKEN);  
       try{
        res.status(200).send(token)
       console.log("cookie setting done")
       }
       catch(e){
        console.log(e)
       }
    

    res.status(201).send({message:"user already existed..pleasen signIn!"})
       return ;
   }
   const hashedPassword=await bcrypt.hash(parsedReq.data.password,10);
   const user=await prismaClient.user.create({
    data:{name:parsedReq.data.username,
    password:hashedPassword,
    email:parsedReq.data.email}
   })
   const token=await jwt.sign({username:parsedReq.data.username,
    userId:user.id
   },JWTTOKEN);
   console.log(user.id);
   res.status(200).send(token)
   res.status(200).send({message:"Successfully signed up! Redirecting to sign in..."});

    }
    catch(e){
        res.status(401).send({message:"unauthorized"});
        console.log(e)
    }

   
})

app.post('/signin',AuthUser,async (req,res)=>{
    const safeparsed=signInSchema.safeParse(req.body.data);
    if(!safeparsed.success){
        console.log(safeparsed.error);
        res.status(400).send('Invalid inputs');
        return ;
    }
    const parsedReq=req.body
    // @ts-ignore
    const userid=await req.userId
    if(!userid){
        console.log("user id not found in token")
        return
    }


    const user=await prismaClient.user.findFirst({where:{id:userid}});
    if(!user){
        res.status(401).send('User not found');
        return;
    }
    if(user.email!==parsedReq.data.email){
        res.status(401).send('Invalid email');
        return; 
    }

    await bcrypt.compare(parsedReq.data.password,user.password,function(err,hash){
        if(err){
            res.status(401).send("Invalid password")
        }
    })
    console.log(JWTTOKEN)
    res.status(200).send(user)

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
    res.status(200).send(newRoom.id);
})

app.get("/chats/:roomId",async (req,res)=>{
    const roomId=Number(req.params.roomId)
    if(!roomId){
        res.send("room Id not found")
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

    res.send(messages)
})


app.get("/room/:slug",async (req,res)=>{
    const slug=req.params.slug
    if(!slug){
        res.send("slug not found")
        return
    }
    const room=await prismaClient.room.findFirst({
        where:{
            slug
        }
    })
    console.log(room)

    res.send(room)
})


app.get("/room/:roomId",async (req,res)=>{
    const roomId=req.params.roomId
    if(!roomId){
        res.send("roomId not found")
        return
    }
    const room=await prismaClient.room.findFirst({
        where:{
            id:Number(roomId)
        }
    })
    console.log(room)

    res.send(room)
})

    app.listen(3002,()=>{
        console.log('Server is running on port 3001');
    })
