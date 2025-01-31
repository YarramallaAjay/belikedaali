"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Pencil, Users, Share2, ChevronRight, Heart, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "./components/landingpage/components/ui/button";
import { CursorGlow } from "./components/landingpage/components/cursor-glow";
import { FloatingBubbles } from "./components/landingpage/components/floating-bubbles";
import { PaintStrokes } from "./components/landingpage/components/paint-strokes";
import { JoinRoomModal } from "./components/landingpage/components/join-room-modal";
import { UserRooms } from "./components/landingpage/components/user-rooms";

const features = [
  {
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team members in real-time.",
    icon: Users,
    color: "primary"
  },
  {
    title: "Intuitive Drawing Tools",
    description: "Professional-grade drawing tools that are easy to use.",
    icon: Pencil,
    color: "secondary"
  },
  {
    title: "Easy Sharing",
    description: "Share your creations with anyone, anywhere, instantly.",
    icon: Share2,
    color: "success"
  }
];

const mockRooms = [
  {
    id: "1",
    name: "Project Brainstorm",
    lastAccessed: "2 hours ago",
    participants: 3,
  },
  {
    id: "2",
    name: "Team Meeting Notes",
    lastAccessed: "1 day ago",
    participants: 5,
  }
];

export default function Home() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <CursorGlow />
      <FloatingBubbles />
      <PaintStrokes />
      
      <nav className="fixed w-full p-6 backdrop-blur-sm z-10 nav-shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900"
          >
            BelikedaAli
          </motion.h1>
          <div className="space-x-6 flex items-center">
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </Button>
            ) : (
              <>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="btn-secondary px-6 py-2 rounded-lg shadow-lg"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="btn-primary px-6 py-2 rounded-lg shadow-lg"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-7xl font-bold leading-tight">
              Draw Together,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                Create Together
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Join the creative revolution with BelikedaAli. Sketch, collaborate, and bring your ideas to life in real-time.
            </p>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-primary px-8 py-4 rounded-lg shadow-lg text-lg"
              >
                Create Canvas
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn-secondary px-8 py-4 rounded-lg shadow-lg text-lg"
                onClick={() => setIsJoinModalOpen(true)}
              >
                Join Room
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-2xl transform rotate-6"></div>
            <Image
              src="https://images.unsplash.com/photo-1580493113011-ad79f792a7c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FudmFzfGVufDB8fDB8fHwy"
              alt="Collaborative Drawing"
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose BelikedaAli?</h2>
            <p className="text-xl text-gray-600">Everything you need to bring your ideas to life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`feature-card ${feature.color} rounded-xl p-6`}
              >
                <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {isLoggedIn && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Your Rooms</h2>
              <UserRooms rooms={mockRooms} />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8">Recent Canvas</h2>
              <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1611532736576-6c5f3f9d1c3d"
                  alt="Recent Canvas"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                  <Button size="lg" className="btn-primary">
                    Continue Drawing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="footer-gradient text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BelikedaAli</h3>
              <p className="text-white/80">Making collaboration creative and fun</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Github className="w-6 h-6" />
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 BelikedaAli. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </main>
  );
}