import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTTOKEN } from "./config";
const wss=new WebSocketServer({port:8080});

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
    const decoded=jwt.verify(token,JWTTOKEN);
    if(!decoded || !(decoded as JwtPayload) .userId){
        console.log(`Invalid user`);
        ws.close();
        return;

    }

    ws.on("message",message=>{
        ws.send(`Hello, you sent -> ${message}`);
    })
})