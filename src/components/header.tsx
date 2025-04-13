'use client';
import Image from 'next/image';
import { DMSans, manrope } from '@/lib/fonts';
import { Document } from '@prisma/client';
import UserBar from './UserBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header({ docProps, userId }: { docProps: Document, userId?: string }) {

  const router = useRouter()
  return (
    <header className="relative bg-[#A414D5] text-white pt-6 lg:px-[140px] px-4 pb-10 overflow-hidden">
      {userId && (
        <UserBar />
      )}
      <Image
        src="/headerimg.png"
        alt="Header background"
        fill
        className="object-cover mix-blend-multiply pointer-events-none opacity-80 z-0"
      />
      {!userId && (

        <div className={`${manrope.className} relative z-10 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
          <div className="xl:w-full w-[40%] h-full flex items-center px-6">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={135} height={60} />
            </Link>
          </div>
          <div className="w-full flex gap-7 text-nowrap justify-end items-center p-2">
            <p className='md:inline hidden'>Find Tutor</p>
            <p className='md:inline hidden'>Become Tutor</p>
            <Link href="/signin">
            <p className='md:inline hidden hover:text-fuchsia-700'>Sign In</p>
            </Link>
            <button onClick={() => router.push('/signup')} className="rounded-full sm:text-base text-sm bg-black hover:bg-[#A414D5] text-white h-full px-8">
              Get Started For Free
            </button>
          </div>
        </div>
      )}

      <div className={`${DMSans.className} mt-10`}>
        <h1 className='sm:text-5xl text-3xl font-bold text-white'>{docProps.title}</h1>
        <div className='flex gap-6'>
          <p className='sm:text-lg text-sm text-white mt-4 font-light flex gap-3'>Document Type:
            <span className='font-semibold'>
              {docProps.ContentType || "N/A"}
            </span>
          </p>
          <p className='sm:text-lg text-sm text-white mt-4 font-light flex gap-3'>Subject Area:
            <span className='font-semibold'>
              {(docProps.subject || "N/A")}
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}