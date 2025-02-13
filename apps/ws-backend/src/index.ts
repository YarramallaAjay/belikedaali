import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTTOKEN } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prisma";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

// Function to authenticate a user based on a JWT token
function AuthUser(token: string) {
    try {
        const decodedToken = jwt.verify(token, JWTTOKEN) as JwtPayload;
        return decodedToken?.userId || null;
    } catch (error) {
        return null;
    }
}

// Function to sync messages to the database
async function syncMessagesToDB(message: any, userId: string) {
    console.log("Called syncMessagesToDB");


    if (!message || !message.message) {
        console.log("Empty message");
        return;
    }

    if (typeof message === "string") {

        message= JSON.parse(message);
    }
    console.log(message)


    try {
        const chatMessage = await prismaClient.chat.create({
            data: {
                message: message.message,
                roomId: message.roomId,
                userId: userId,
            },
        });
        console.log("Saved message:", chatMessage);
    } catch (error) {
        console.log("Database error:", error);
    }
}

wss.on("connection", (ws, request) => {
    const url = request.url;
    console.log(`New connection from`, request.headers.origin);

    if (!url) {
        ws.close();
        return;
    }

    const params = new URLSearchParams(url.split("?")[1]);
    const token = params.get("token");

    if (!token) {
        console.log("Token not found in URL");
        ws.close();
        return;
    }

    const userId = AuthUser(token);
    if (!userId) {
        console.log("Invalid token");
        ws.close();
        return;
    }

    // Check if the user already exists
    let existingUser = users.find((user) => user.userId === userId);
    if (!existingUser) {
        existingUser = { userId, ws, rooms: [] };
        users.push(existingUser);
    } else {
        existingUser.ws = ws; // Update WebSocket connection
    }

    console.log("Connected users:", users);

    ws.on("message", async (data) => {
        try {
            const parsedData = JSON.parse(data.toString());

            if (parsedData.type === "JOIN_ROOM") {
                const room = await prismaClient.room.findFirst({ where: { id: parsedData.roomId } });
                if (!room) {
                    ws.send("Room not found");
                    return;
                }

                if (!existingUser.rooms.includes(parsedData.roomId)) {
                    existingUser.rooms.push(parsedData.roomId);
                }

                console.log("Updated user list:", users);
            }

            if (parsedData.type === "LEAVE_ROOM") {
                const room = await prismaClient.room.findFirst({ where: { id: parsedData.roomId } });
                if (!room) {
                    ws.send("Room not found");
                    return;
                }

                existingUser.rooms = existingUser.rooms.filter((roomId) => roomId !== parsedData.roomId);
                console.log("User after leaving room:", users);
            }

            if (parsedData.type === "chat") {
                // Broadcast message to other users in the same room
                users.forEach((user) => {
                    if (user.rooms.includes(parsedData.roomId) && user.ws !== ws) {
                        user.ws.send(
                            JSON.stringify({
                                type: parsedData.type,
                                message: parsedData.message,
                                roomId: parsedData.roomId,
                            })
                        );
                    }
                });

                // Save message to database **only once**
                await syncMessagesToDB(parsedData, userId);
            }
        } catch (error) {
            console.log("Error handling message:", error);
        }
    });

    ws.on("close", () => {
        console.log(`User ${userId} disconnected`);
        // Remove the user from the list when they disconnect
        const index = users.findIndex((user) => user.ws === ws);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
});
