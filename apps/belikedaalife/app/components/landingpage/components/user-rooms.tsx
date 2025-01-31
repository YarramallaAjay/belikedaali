"use client"

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Clock, Users } from "lucide-react";

interface Room {
  id: string;
  name: string;
  lastAccessed: string;
  participants: number;
}

export function UserRooms({ rooms }: { rooms: Room[] }) {
  if (rooms.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No rooms joined yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <motion.div
          key={room.id}
          whileHover={{ scale: 1.02 }}
          className="feature-card"
        >
          <Card className="p-4 hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {room.lastAccessed}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {room.participants}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
