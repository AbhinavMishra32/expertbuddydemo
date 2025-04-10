"use client"

import { SignUp } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Sparkles, Stars } from "lucide-react"
import { useEffect, useState } from "react"
import { hubotSans } from "@/lib/fonts"

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false)
  const [hoverButton, setHoverButton] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <SignUp />
  );
};
