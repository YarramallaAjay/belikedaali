import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTTOKEN } from "@repo/backend-common/config";

import {prismaClient} from '@repo/db/prisma'

const wss=new WebSocketServer({port:8080});

interface User{
    ws:WebSocket,
    rooms:string[],
    userId:string
}



const users:User[]=[]


function AuthUser(token :string){

    const decodedtoken=jwt.verify(token,JWTTOKEN) as JwtPayload

    if(!decodedtoken||!decodedtoken.userId){
        return null;
    }

    return decodedtoken.userId

}


async function syncMessagesToDB(message:any,userId:string){
    console.log(message)

    if(!message){
        console.log("empty message")
        return null;

    }
    if(typeof message == 'string'){
         message=JSON.parse(message)
    }
    try{
        const chatMessage=await prismaClient.chat.create({
            data:{
                message:message.message,
                roomId:message.roomId,
                userId:userId    
            }
        })
        console.log(chatMessage)

    }
    catch(e){
        console.log(e)
    }
    
}

wss.on("connection",(ws,request)=>{
    const url=request.url;
    console.log(`New connection from ${url}`);
    if(url==null){
        return null;
    }   
    const params=new URLSearchParams(url?.split("?")[1]);
    const token=params.get("token");
    if(!token){
        return null;
    }
    const userId=AuthUser(token)
    if(!userId){
        ws.close()
        return null;
    }

    users.push({
        ws,
        userId,
        rooms:[]
    })

    
    ws.on("message",async (data)=>{
        try{
            let parsedData
        if(typeof data !== 'string'){
             parsedData=JSON.parse(data.toString())
        }
        else{
             parsedData=JSON.parse(data)
        }


        if(parsedData.type==="JOIN_ROOM"){
            // const roomId=parsedData.roomId as number
            const room=await prismaClient.room.findFirst({where:{id:parsedData.roomId as number}})
            if(!room){
                ws.send("room not found")
                return
            }
            users.find(user=>user.ws===ws)?.rooms.push(parsedData.roomId)
            console.log(users)
        }

        if(parsedData.type==="LEAVE_ROOM"){
            const room=await prismaClient.room.findFirst({where:{id:parsedData.roomId as number}})
            if(!room){
                ws.send("room not found")
                return
            }
            const user=users.find(user=>user.ws===ws)
            if(!user){
                console.log("user not found")
                return
            }
            user.rooms=user.rooms.filter(x=>x!==parsedData.roomId)
            console.log(users)
        }

        if(parsedData.type==='chat'){
            users.forEach(user=>{
                if(user.rooms.includes(parsedData.roomId)){
                    user.ws.send(JSON.stringify({
                       type:parsedData.type,
                       message:parsedData.message,
                       roomId:parsedData.roomId   
                    }))
                }
            })
            syncMessagesToDB(parsedData,userId)

        }
        }
        catch(e){
            console.log(e)
        }

    })
        
    
})
