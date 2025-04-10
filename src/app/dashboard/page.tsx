'use client'
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ThemeSelectorButton from "@/components/ThemeSelectorButton";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const { isLoaded, user } = useUser();

  if (isLoaded) {
    console.log("User ID: ", user);
  }

  return (
    <p>Dashboard Page</p>
  );
}
