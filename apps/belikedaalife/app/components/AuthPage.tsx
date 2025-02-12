"use client";
import { useState, useRef, useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { validateSignIn, validateSignup } from "../auth/signInValidation";
import { ToastContainer, toast } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import styles for Toastify

interface AuthProps {
  mode: "signin" | "signup";
}

export default function AuthPage({ mode }: AuthProps) {
  const [username, setUsername] = useState("");
  const passwordRef = useRef("");
  const [email, setEmail] = useState("");
  const [passwordMask, setPassWordMask] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (document.referrer && !localStorage.getItem('redirectAfterAuth')) {
      localStorage.setItem('redirectAfterAuth', document.referrer);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await validateSignIn(email, passwordRef.current);

    if (res === 200) {
      const redirectTo = localStorage.getItem('redirectAfterAuth') || "/";
      toast.success("Successfully signed in!");  // Success toast
      router.push(redirectTo);
    } else {
      toast.error("Sign in failed. Please try again.");  // Error toast
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await validateSignup(username, passwordRef.current, email);

    if (res?.status === 200 || 201) {
      toast.success(res?.data.message);  // Success toast
      router.push("/auth/signin");
    } 
    else {
      console.log(res)
      toast.error("Sign up failed. Please try again.");  // Error toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to DrawMaster</h2>
        </div>

        {mode === "signin" && (
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="signin-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-t-md"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="signin-password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-b-md"
                  placeholder="Password"
                  value={passwordMask}
                  onChange={(e) => {
                    passwordRef.current = e.target.value;
                    setPassWordMask(e.target.value);
                    console.log(e.target.value)
                    
                  }}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        )}

        {mode === "signup" && (
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="signup-name" className="sr-only">
                  Full name
                </Label>
                <Input
                  id="username"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="rounded-t-md"
                  placeholder="Full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="signup-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="signup-password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="rounded-b-md"
                  placeholder="Password"
                  value={passwordMask}
                  onChange={(e) => {
                    passwordRef.current = e.target.value;
                    setPassWordMask("*".repeat(passwordRef.current.length));
                  }}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        )}
      </motion.div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={true} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
}
