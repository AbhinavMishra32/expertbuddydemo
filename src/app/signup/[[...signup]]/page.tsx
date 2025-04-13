"use client"
import { SignUp } from "@clerk/nextjs"
import Image from "next/image"


export default function SignUpPage() {

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F5F3EF]">
      <div className="w-fit h-fit p-2 rounded-2xl bg-[#A414D5] flex flex-col gap-3 shadow-xl">
        <div className="bg-[#F5F3EF] rounded-xl p-2">
          <Image src="/logo.png" alt="Logo" width={135} height={60} />
        </div>
        <SignUp />
      </div>
    </div>
  );
};