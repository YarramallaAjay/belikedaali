"use client";

import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export  default function Canvas(){

    const canvasRef=useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
   

        if(canvasRef.current){
            

        initDraw(canvasRef.current)
        }

    },[canvasRef])

    return (
        <div>
            <canvas ref={canvasRef} width="1080" height="1000" />
        </div>
    )
}