"use client"

import { useEffect, useState, useRef } from "react"
import { useSocket } from "../hooks/useSocket"

interface Message {
  id: string
  message: string
}

interface User {
  name: string
  photoUrl?: string
}

interface ChatComponentProps {
  initialMessages: Message[]
  roomId: string
}

export default function ChatRoomClient({ initialMessages, roomId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentMessage, setCurrentMessage] = useState("")
  const { socket, loading } = useSocket()
  const [user] = useState<User>({ name: "AJAY" })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          roomId: roomId,
        }),
      )

      socket.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data)
        if (parsedMessage.type === "chat") {
          setMessages((prevMessages) => [...prevMessages, { id: roomId, message: parsedMessage.message }])
        }
      }
    }

    return () => {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "LEAVE_ROOM",
            roomId: roomId,
          }),
        )
      }
    }
  }, [socket, loading, roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef])

  const sendMessage = () => {
    if (socket && currentMessage.trim() !== "") {
      socket.send(
        JSON.stringify({
          type: "chat",
          roomId: roomId,
          message: currentMessage,
        }),
      )
      setCurrentMessage("")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto h-[600px] bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            {user.name.charAt(0)}
          </div>
          <span className="text-xl font-semibold">{user.name}</span>
        </div>
      </div>
      <div className="flex-grow overflow-hidden px-6 py-4">
        <div className="h-full overflow-y-auto pr-4">
          {messages.map((m, index) => (
            <div key={index} className="mb-4">
              <div className="inline-block p-2 rounded-lg bg-gray-200 text-black">{m.message}</div>
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

