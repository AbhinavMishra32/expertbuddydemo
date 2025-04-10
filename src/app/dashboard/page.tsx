'use client'
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ThemeSelectorButton from "@/components/ThemeSelectorButton";
import { useUser } from "@clerk/nextjs";
import UserProfileButton from "@/components/UserProfileButton";
import { UploadButton } from "@/utils/uploadthings";

export default function Home() {

  const { isLoaded, user } = useUser();

  if (isLoaded) {
    console.log("User ID: ", user);
  }

  return (
    <>
      <UserProfileButton />
      <p>Dashboard Page</p>
      <p>Yoooo</p>
      hello
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
