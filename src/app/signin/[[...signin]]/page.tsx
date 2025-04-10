"use client"

import { SignIn } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Sparkles, Stars } from "lucide-react"
import { useEffect, useState } from "react"
import { hubotSans } from "@/lib/fonts"

export default function SignInPage() {
  const [mounted, setMounted] = useState(false)
  const [hoverButton, setHoverButton] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <SignIn />
  )
}

