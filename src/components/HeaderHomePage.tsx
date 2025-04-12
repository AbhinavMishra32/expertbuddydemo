import Image from 'next/image';
import { DMSans, manrope } from '@/lib/fonts';
import { Document } from '@prisma/client';

export default function HeaderHomePage({onSubmit} : {onSubmit: () => void}) {
  return (
    <header className="relative bg-[#A414D5] text-white pt-6 lg:px-[140px] px-4 pb-10 overflow-hidden">
      <Image
        src="/headerimg.png"
        alt="Header background"
        fill
        className="object-cover mix-blend-multiply pointer-events-none opacity-80 z-0"
      />
      <div className={`${manrope.className} relative z-10 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
        <div className="xl:w-full w-[40%] h-full flex items-center px-6">
          <Image src="/logo.png" alt="Logo" width={135} height={60} />
        </div>
        <div className="w-full flex md:justify-between justify-end items-center p-2">
          <p className='md:inline hidden'>Find Tutor</p>
          <p className='md:inline hidden'>Become Tutor</p>
          <p className='md:inline hidden'>Sign In</p>
          <button className="rounded-full sm:text-base text-sm bg-black hover:bg-[#A414D5] text-white h-full px-8">
            Get Started For Free
          </button>
        </div>
      </div>

      <div className={`${DMSans.className} mt-10`}>
        <h1 className='sm:text-4xl text-3xl font-semibold text-white'>Accounting Homework Samples & Study Documents</h1>
        <p className='sm:text-lg text-sm text-white mt-4 font-light flex gap-3'>Get Access To Our Online Database Of Accounting Writing Samples.</p>
      </div>

      <div className={`${DMSans.className} relative z-10 mt-7 flex gap-2 items-center bg-white rounded-full pl-6 pr-2 h-16 w-full max-w-xl shadow-md`}>
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4175 24.5006C19.5387 24.5006 24.5009 19.5384 24.5009 13.4172C24.5009 7.29607 19.5387 2.33389 13.4175 2.33389C7.29636 2.33389 2.33418 7.29607 2.33418 13.4172C2.33418 19.5384 7.29636 24.5006 13.4175 24.5006Z" stroke="#6B7B93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M25.6678 25.6671L23.3345 23.3338" stroke="#6B7B93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        
        <input
          type="text"
          placeholder="Find any type of work, topic, etc."
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 ml-2"
        />
        <button className="bg-[#16192C] text-white px-8 py-3 rounded-full ml-2 hover:bg-neutral-600 transition">
          Search
        </button>
      </div>
    </header>
  );
}