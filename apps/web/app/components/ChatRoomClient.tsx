"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useSocket } from "../hooks/useSocket"
import { v4 as uuidv4 } from "uuid"

interface Message {
  id: string
  message: string
  userId: string
  timestamp: number
}

interface User {
  id: string
  name: string
  photoUrl?: string
}

interface ChatComponentProps {
  initialMessages: Message[]
  roomId: string
  currentUser: User
}

export default function ChatRoomClient({ initialMessages, roomId, currentUser }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentMessage, setCurrentMessage] = useState("")
  const { socket, loading } = useSocket()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          roomId: roomId,
          userId: currentUser.id,
        }),
      )

      socket.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data)
        if (parsedMessage.type === "chat") {
          const newMessage: Message = {
            id: parsedMessage.id,
            message: parsedMessage.message,
            userId: parsedMessage.userId,
            timestamp: parsedMessage.timestamp,
          }
          setMessages((prevMessages) => {
            // Check if the message already exists to prevent duplication
            if (!prevMessages.some((m) => m.id === newMessage.id)) {
              return [...prevMessages, newMessage]
            }
            return prevMessages
          })
        }
      }
    }

    return () => {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "LEAVE_ROOM",
            roomId: roomId,
            userId: currentUser.id,
          }),
        )
      }
    }
  }, [socket, loading, roomId, currentUser.id])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const sendMessage = () => {
    if (socket && currentMessage.trim() !== "") {
      const newMessage: Message = {
        id: uuidv4(),
        message: currentMessage,
        userId: currentUser.id,
        timestamp: Date.now(),
      }
      socket.send(
        JSON.stringify({
          type: "chat",
          roomId: roomId,
          message: currentMessage,
          id: newMessage.id,
          userId: currentUser.id,
          timestamp: newMessage.timestamp,
        }),
      )
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setCurrentMessage("")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto h-[600px] bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            {currentUser.name.charAt(0)}
          </div>
          <span className="text-xl font-semibold">{currentUser.name}</span>
        </div>
      </div>
      <div className="flex-grow overflow-hidden px-6 py-4">
        <div className="h-full overflow-y-auto pr-4">
          {messages.map((m,index) => (
            <div key={index} className={`mb-4 ${m.userId === currentUser.id ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-2 rounded-lg ${
                  m.userId === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {m.message}
              </div>
              <div className="text-xs text-gray-500 mt-1">{new Date(m.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="px-6 py-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full gap-2"
        >
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

