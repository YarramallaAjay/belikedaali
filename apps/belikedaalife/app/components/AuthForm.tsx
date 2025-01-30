"use client"
import type React from "react"
import { useState } from "react"
import { ExcaliInput } from "./ExcaliInput"
import { ExcaliButton } from "./button"
import { ExcaliCheckbox } from "./checkBox"

export const ExcaliAuthForm= ({isSignUp}:{
  isSignUp:boolean
}) => {

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-black rounded">
      <h2 className="text-3xl font-bold mb-6 font-caveat">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form>
        {isSignUp && <ExcaliInput label="Name" type="text" placeholder="Enter your name" required />}
        <ExcaliInput label="Email" type="email" placeholder="Enter your email" required />
        <ExcaliInput label="Password" type="password" placeholder="Enter your password" required />
        {isSignUp && <ExcaliCheckbox label="I agree to the terms and conditions" required />}
        <ExcaliButton type="submit">{isSignUp ? "Sign Up" : "Sign In"}</ExcaliButton>
        <div className="mt-4">
          <button type="button" className="text-lg underline font-caveat">
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  )
}

