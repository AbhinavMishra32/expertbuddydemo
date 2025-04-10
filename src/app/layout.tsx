import type { Metadata } from "next";
import { Geist, Geist_Mono, Sen } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
    title: "Roadmap AI",
    description: "Generate any roadmap you want",
};


export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                // baseTheme: dark,
                // elements: {
                //     footer: "hidden",
                // }
            }}
        >
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}