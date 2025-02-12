"use client"

import { useEffect, useState } from "react";
import { BACKEND_URL, WS_URL } from "../config";
import Canvas from "./canvas";
import axios from "axios";

export default function RoomCanvas({ slug }: { slug: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [roomId, setRoomId] = useState("");

    // Fetch roomId when slug changes
    useEffect(() => {
        const url = `${BACKEND_URL}/room/${slug}`;
        const token=localStorage.getItem('belikedaaliusertoken')
        axios.get(url)
            .then((response) => {
                setRoomId(response.data.id );
            })
            .catch((error) => {
                console.error("Error fetching room ID:", error);
            });
    }, [slug]);

    // Create WebSocket when roomId is available
    useEffect(() => {
        if (!roomId) return; // Wait until roomId is set

        const token=localStorage.getItem('belikedaaliusertoken')||" "
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyaW5pdmFzIiwidXNlcklkIjoiZjUzM2Q1YjAtOGI3NC00YTIyLTk0MTEtYWMzZmUwYjc2OGU1IiwiaWF0IjoxNzM4MTU1NDk1fQ.EA_XTZ2FYyzKTMMA1f5Tu9UrrBJ1-9NCfjFnVwNqwFg`);
        
        ws.onopen = () => {
            console.log("WebSocket connected, joining room:", roomId);
            ws.send(JSON.stringify({
                type: "JOIN_ROOM",
                roomId: roomId
            }));
        };

        setSocket(ws);

        // Cleanup on unmount or roomId change
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [roomId]); // Reconnect WebSocket if roomId changes

    if (!socket || !roomId) {
        return null; // Wait for socket and roomId to be ready
    }

    return (
        <Canvas roomId={roomId} socket={socket} />
    );
}