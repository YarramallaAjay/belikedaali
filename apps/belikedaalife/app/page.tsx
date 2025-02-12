"use client";
import React, { useRef, useState } from "react"
import Link from "next/link"
import { AnimatedCanvas } from "./components/AnimatedCanvas"
import { FeatureCard } from "./components/FeatureCard"
import { Button } from "./components/ui/Button"
import { useRouter } from "next/navigation";



export default function Home() {


  const[popup,setPopup]=useState(false)
  
  const [slug,setSlug]=useState("")

  const timeoutRef=useRef<ReturnType<typeof setTimeout>|null>(null)

  const router=useRouter()

  const openPopUp=()=>{
    setPopup(true)
  }

  const closepopUp=()=>{
    // isSignedIn().then((data)=>{
    //   console.log(data)
      setPopup(false)
      router.push(`/canvas/${slug}`)
    // }).catch(err=>{
    //   console.log(err)
    // })

  }

  function isSignedIn(){
    return new Promise((resolve,reject)=>{
      console.log("in signedIn()")

      router.push(`/auth/signup`)

    })
    
    
}

function useDebouncer(func:CallableFunction,delay:number){
  if(timeoutRef.current){
    clearTimeout(timeoutRef.current)


  }
  timeoutRef.current=setTimeout(()=>{
      try{
        console.log("in debouncer")
          func()
          return 
      }
      catch(e){
          console.error(e)
      }
  },delay)
}



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">DrawMaster</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/auth" className="text-gray-600 hover:text-gray-800 transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Unleash Your Creativity with DrawMaster</h2>
            <p className="text-xl text-gray-600 mb-8">
              Create stunning diagrams, sketches, and illustrations with our intuitive drawing tool. Collaborate in
              real-time and bring your ideas to life.
            </p>
            <Button asChild size="lg" onClick={isSignedIn}>
              <Link href="">Get Started for Free</Link>
            </Button>
            <Button asChild size="lg" onClick={openPopUp} className="bg-gray-900 font-bold text-white">
              <Link href="">Join Room</Link>
            </Button>

            {popup && <div className="bg-white-900 flex justify center text-gray-900">
              <p>Join Room</p>
              <div>
                <input value={slug} type="text" placeholder="Enter Room Id" onChange={(e)=>{
                  e.preventDefault()
                  
                    setSlug(e.target.value)
                  // setSlug(e.target.value)
                }}></input>
              </div>
              <div>
                <Button onClick={closepopUp}>join</Button>
              </div>
              </div>}
          </div>
          <div className="lg:w-1/2">
            <AnimatedCanvas />
          </div>
        </section>

        <section id="features" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Intuitive Drawing Tools"
                description="Easy-to-use tools for creating shapes, lines, and freehand drawings."
                icon="Pen"
              />
              <FeatureCard
                title="Real-time Collaboration"
                description="Work together with your team in real-time, no matter where you are."
                icon="Users"
              />
              <FeatureCard
                title="Cloud Sync"
                description="Your drawings are automatically saved and synced across all your devices."
                icon="Cloud"
              />
              <FeatureCard
                title="Export Options"
                description="Export your creations in various formats, including PNG, SVG, and PDF."
                icon="Download"
              />
              <FeatureCard
                title="Templates"
                description="Get started quickly with a wide range of pre-made templates."
                icon="LayoutTemplate"
              />
              <FeatureCard
                title="Version History"
                description="Track changes and revert to previous versions of your drawings."
                icon="History"
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Simple, Transparent Pricing</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-center text-gray-900 mb-2">Pro Plan</h3>
                <p className="text-center text-gray-600 mb-6">Everything you need for professional-grade diagrams</p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">$12</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Advanced collaboration tools
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Button className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 DrawMaster. All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

