import { useRef, useEffect } from "react";
import { initDraw } from ".";

export default function Canvas({socket,roomId}:{
    socket:WebSocket,
    roomId:string
}){

    const canvasRef=useRef<HTMLCanvasElement>(null);

        useEffect(()=>{
       
    
            if(canvasRef.current){
            
                console.log("ID"+roomId)
                
    
            initDraw(canvasRef.current,socket,roomId)
            }
    
        },[canvasRef])

   
    return (
        <div>
            <canvas ref={canvasRef} width="1080" height="1000"></canvas>
        </div>
    )
}