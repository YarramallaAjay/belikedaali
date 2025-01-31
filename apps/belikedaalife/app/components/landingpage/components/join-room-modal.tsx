"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function JoinRoomModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [roomSlug, setRoomSlug] = useState('');

  const handleJoin = () => {
    // Handle room joining logic here
    console.log('Joining room:', roomSlug);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join Room</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter room code..."
            value={roomSlug}
            onChange={(e) => setRoomSlug(e.target.value)}
            className="bg-muted"
          />
          <Button onClick={handleJoin} className="w-full">
            Join Room
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}