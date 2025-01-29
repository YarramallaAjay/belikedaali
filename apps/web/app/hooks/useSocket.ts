import { useEffect, useState } from "react";
import { WS_URL } from "../../config";

export function useSocket(){
    const [loading,setLoading]=useState(true)
    const [socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFqYXkiLCJ1c2VySWQiOiIxZjgyMTRiZC03ZWFmLTQzNGMtOTIzYy1kODFkZDMxZTM2ZDUiLCJpYXQiOjE3MzgwODU0NjN9.fLV3_M2eIf5T5pEpkq8mhs3hXGEfzjiRxy4zv3yTTMA`);
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)

        }

    },[])


    return {
        socket,loading
    }
}