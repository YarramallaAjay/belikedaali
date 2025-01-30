"use client"

import { motion } from "framer-motion";
import { Pencil, Users, Share2, Sparkles } from "lucide-react";
import { CursorGlow } from "./components/landingpage/components/cursor-glow";
import { FloatingBubbles } from "./components/landingpage/components/floating-bubbles";
import { useEffect } from "react";

export default function Home() {
  const updateElementGlow = (e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--mouse-x', `${x}%`);
    element.style.setProperty('--mouse-y', `${y}%`);
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.btn, .feature-card');
    
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const glowElement = target.closest('.btn, .feature-card');
      if (glowElement) {
        updateElementGlow(e, glowElement as HTMLElement);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <CursorGlow />
      <FloatingBubbles />
      
      <nav className="fixed w-full p-6 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold wiggle-hover"
          >
            BelikedaAli
          </motion.h1>
          <div className="space-x-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="btn btn-primary px-4 py-2 rounded-lg"
            >
              Sign In
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="btn btn-secondary px-4 py-2 rounded-lg"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-bold mb-6 sketch-underline"
          >
            Draw Together,<br />Create Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Join the creative revolution with BelikedaAli. Sketch, collaborate, and bring your ideas to life in real-time.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <button className="btn btn-primary px-8 py-4 rounded-lg text-xl">
              Create Canvas
            </button>
            <button className="btn btn-secondary px-8 py-4 rounded-lg text-xl">
              Join Room
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="feature-card drawing p-6 rounded-lg"
          >
            <Pencil className="w-12 h-12 mb-4 wiggle-hover" />
            <h3 className="text-2xl font-bold mb-2 sketch-underline">Intuitive Drawing</h3>
            <p className="text-gray-600">Create beautiful sketches with our easy-to-use tools and intuitive interface.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="feature-card collaboration p-6 rounded-lg"
          >
            <Users className="w-12 h-12 mb-4 wiggle-hover" />
            <h3 className="text-2xl font-bold mb-2 sketch-underline">Real-time Collaboration</h3>
            <p className="text-gray-600">Work together with your team in real-time, seeing changes as they happen.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="feature-card sharing p-6 rounded-lg"
          >
            <Share2 className="w-12 h-12 mb-4 wiggle-hover" />
            <h3 className="text-2xl font-bold mb-2 sketch-underline">Easy Sharing</h3>
            <p className="text-gray-600">Share your creations with anyone, anywhere, with just a single click.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="feature-card drawing p-12 rounded-2xl"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 wiggle-hover" />
            <h2 className="text-4xl font-bold mb-4 sketch-underline">Ready to Start Creating?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of creators and bring your ideas to life.</p>
            <button className="btn btn-success px-8 py-4 rounded-lg text-xl">
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}