import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
    title: "XBuddy (Demo) | Abhinav Mishra",
    description: "Expert Buddy | Find expert material and tutor",
    openGraph: {
        title: "XBuddy (Demo) | Abhinav Mishra",
        description: "Expert Buddy | Find expert material and tutor",
        url: "https://xbuddy.abhinavmishra.in",
        images: [
            {
                url: "/logo.png",
                width: 288,
                height: 90,
                alt: "XBuddy - Expert Buddy",
            }
        ],
        type: "website",
    },
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
                    <div>
                        <NextSSRPlugin
                            /**
                             * The `extractRouterConfig` will extract **only** the route configs
                             * from the router to prevent additional information from being
                             * leaked to the client. The data passed to the client is the same
                             * as if you were to fetch `/api/uploadthing` directly.
                             */
                            routerConfig={extractRouterConfig(ourFileRouter)}
                        />
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}