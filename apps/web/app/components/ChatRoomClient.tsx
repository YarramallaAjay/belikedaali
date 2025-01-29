/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"

export function ChatRoomClient({messages,id}:{
    messages:{message:string}[],
    id:string
}){
    console.log(messages)
    const [chats,setChats]=useState(messages)
    const {socket,loading}=useSocket()
    const [currentMessage,setCurrentMessage]=useState("")
    // console.log("messages from client:")
    // messages.forEach(m=> {console.log(m.message)})

    

    try{
         useEffect(()=>{
      
            console.log("mounting")


            
            if(socket && !loading){
                socket?.send(JSON.stringify({
                    type:"JOIN_ROOM",
                    roomId:id
                }))

                socket.onmessage=(event)=>{

                        const parsedMessage=JSON.parse(event.data)
                        console.log("parsedMessage")
                        console.log(parsedMessage)
                        if(parsedMessage.type==="chat"){
                            setChats(c=> [...c,{id:id,message:parsedMessage.message}])
                            console.log('updated chats')
                            chats.forEach(chat=> console.log(chat))
    
    
                        }
                        // if(parsedMessage.type==='JOIN_ROOM'){
                        //     socket?.send(JSON.stringify({
                        //         type:"JOIN_ROOM",
                        //         roomId:id
                        //     }))
                        // }
                }
    

            }
            else{
                console.log("socket not connected")
            }
            // return ()=>{
            //     socket.send(JSON.stringify({
            //         type:"LEAVE_ROOM",
            //         roomId:id
            //     }))
            //     socket.close()
            //     console.log("unmounting")

            // }
            
         },[socket,loading,id])
        
    }
    catch(e){
        console.log(e)
    }


    // const sendMessage=()=>{
    //     console.log("inside send message")
    //     if(socket && currentMessage.trim()!=""){
    //         socket?.send(JSON.stringify({
    //             type:"chat",
    //             roomId:id,
    //             message:currentMessage
    //         }))
    //         console.log("message sent")

    //         setCurrentMessage("")

    //     }
    // }


    return (
        <div>
            {
            chats.map((message,index)=><div key={index}>{message.message}</div>)}
        <input type="text" placeholder="enter message" value={currentMessage} onChange={(event)=>{
            setCurrentMessage(event.target.value)
        }}></input>
        <button onClick={()=>{
        console.log("inside send message")
        if(socket && currentMessage.trim()!=""){
            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                message:currentMessage
            }))
            console.log("message sent")

            setCurrentMessage("")

        }
    }}>send message</button>
        </div>
        )

   

    
}