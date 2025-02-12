
import { useState, Suspense, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { validateSignIn } from "./../signInValidation"
import AuthPage from "../../components/AuthPage"

export default async function AuthPageContent({params}:{
  params:{mode:"signin"|"signup"}
}) {
  const Authmode =( await params).mode





  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AuthPage mode={Authmode} />
  </Suspense>
  )
}

