'use client'
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ThemeSelectorButton from "@/components/ThemeSelectorButton";
import { useUser } from "@clerk/nextjs";
import UserProfileButton from "@/components/UserProfileButton";
import { UploadButton } from "@/utils/uploadthings";
import aiOnPdf from "@/utils/utils";
import { useState } from "react";

export default function Home() {

  const { isLoaded, user } = useUser();

  const [uploading, setUploading] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  if (isLoaded) {
    console.log("User ID: ", user);
  }

  return (
    <>
      <UserProfileButton />
      <p>Dashboard Page</p>
      <p>Yoooo</p>
      {uploading && <p>Uploading...</p>}
      {analysing && <p>Analysing...</p>}
      {aiResponse && <div className="mt-4 p-4 border rounded">
        <h3 className="font-bold">AI Response:</h3>
        <p>{aiResponse}</p>
      </div>}
      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => setUploading(true)}
        onClientUploadComplete={async (res) => {
          setUploading(false);
          setAnalysing(true);
          try {
            const { text } = await aiOnPdf(res[0].ufsUrl, "Give all the text that is present in the pdf but just the first 10 lines");
            console.log("AI Response: ", text);
            setAiResponse(text || "No response from AI");
          } catch (error) {
            console.error("Error analyzing PDF:", error);
            setAiResponse("Error analyzing PDF");
          } finally {
            setAnalysing(false);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
