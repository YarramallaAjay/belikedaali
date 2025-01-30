"use client"

import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const createBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 100 + 20,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
        });
      }
      setBubbles(newBubbles);
    };

    createBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="floating-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};