import type { Metadata } from "next";
import { Geist, Geist_Mono, Sen, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { cookies } from "next/headers";
import { SidebarProvider } from "../../components/ui/sidebar";
import { SdSidebar } from "../../components/SdSidebar";
import React from "react";
import ThemeProvider from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import UserProfileButton from "@/components/UserProfileButton";
import ThemeSelectorButton from "@/components/ThemeSelectorButton";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: undefined }}>
      <html lang="en">
        <body className={`${sen.variable} antialiased`}>
          <ThemeProvider>
            {/* <ThemeSelectorButton />
                <UserProfileButton /> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}