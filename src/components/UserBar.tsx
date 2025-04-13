import { DMSans, manrope } from '@/lib/fonts';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
export default function UserBar() {
    return (
        <div className={`${manrope.className} relative z-10 px-6 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
            <div className="w-fit h-full flex items-center">
                <Link href='/'>
                    <Image src="/logo.png" alt="Logo" width={135} height={60} />
                </Link>
            </div>
            <div className={`${DMSans.className} w-full h-full flex gap-6 py-3 justify-end items-center`}>
                <p className={`${manrope.className} text-gray-400`}>StudyBank</p>
                <p className={`${manrope.className} text-gray-400`}>Find Tutor</p>
                <p className={`${manrope.className} text-[#968191]`}>Homework</p>
                <Link href="/upload">
                    <p className={`${manrope.className} hover:text-fuchsia-800 hover:cursor-pointer`}>Upload</p>
                </Link>
                <button className="flex gap-2 rounded-full bg-[#FCF4EA] hover:bg-[#ffe9d1] py-2 px-3">
                    <div><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8281 9.57895V7.22102C18.8281 6.06259 17.9064 5.11591 16.7578 5.07458V3.62727C16.7578 2.87341 16.1445 2.26009 15.3906 2.26009H11.6266L11.1406 0.909033C11.0166 0.564501 10.7658 0.289189 10.4342 0.133837C10.1027 -0.0215533 9.73055 -0.0381159 9.38652 0.0871185L2.55625 2.5731C2.21258 2.69817 1.9384 2.9497 1.78418 3.28134C1.62996 3.61298 1.6143 3.98474 1.74012 4.32817L2.01453 5.0772C0.89207 5.14661 0 6.08138 0 7.22102V17.846C0 19.0307 0.963789 19.9945 2.14844 19.9945H16.6797C17.8643 19.9945 18.8281 19.0307 18.8281 17.846V15.41C19.4898 15.3149 20 14.7445 20 14.057V10.932C20 10.2444 19.4898 9.67403 18.8281 9.57895ZM18.8281 14.057C18.8281 14.1647 18.7405 14.2523 18.6328 14.2523H15.5078C14.5386 14.2523 13.75 13.4637 13.75 12.4945C13.75 11.5252 14.5386 10.7367 15.5078 10.7367H18.6328C18.7405 10.7367 18.8281 10.8243 18.8281 10.932V14.057ZM2.84047 3.92505C2.83158 3.90094 2.82756 3.87531 2.82864 3.84963C2.82972 3.82396 2.83588 3.79876 2.84676 3.77548C2.85755 3.75217 2.87286 3.73122 2.89179 3.71386C2.91073 3.69649 2.93291 3.68305 2.95707 3.67431L9.7873 1.18833C9.85363 1.16423 9.90953 1.18216 9.93699 1.19501C9.96445 1.20786 10.014 1.23935 10.0379 1.30575L10.3813 2.26013H10.1172C9.36332 2.26013 8.75 2.87345 8.75 3.62731V5.07263H3.2609L2.84047 3.92505ZM15.5859 3.62727V5.07259H9.92188V3.62727C9.92188 3.51958 10.0095 3.43196 10.1172 3.43196H15.3906C15.4983 3.43196 15.5859 3.51958 15.5859 3.62727ZM16.6797 18.8226H2.14844C1.60996 18.8226 1.17188 18.3845 1.17188 17.846V7.22102C1.17188 6.68255 1.60996 6.24446 2.14844 6.24446H16.6797C17.2182 6.24446 17.6562 6.68255 17.6562 7.22102V9.56478H15.5078C13.8924 9.56478 12.5781 10.879 12.5781 12.4945C12.5781 14.1099 13.8924 15.4242 15.5078 15.4242H17.6562V17.846C17.6562 18.3845 17.2182 18.8226 16.6797 18.8226Z" fill="#E38D2A" />
                        <path d="M15.5078 13.0781C15.8314 13.0781 16.0938 12.8158 16.0938 12.4922C16.0938 12.1686 15.8314 11.9062 15.5078 11.9062C15.1842 11.9062 14.9219 12.1686 14.9219 12.4922C14.9219 12.8158 15.1842 13.0781 15.5078 13.0781Z" fill="#E38D2A" />
                    </svg>
                    </div>
                    <span className='text-xs text-[#E38D2A] font-semibold'>0 USD</span>
                </button>
                <button className='h-full w-fit px-4 rounded-xl bg-[#f0e0fa] hover:bg-[#e8cbf8] border border-[#A414D5]'>Refer a friend</button>
                <div className='hover:cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#16192C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7 8H17" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7 13H13" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className='hover:cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="#16192C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.0001 11.36V11.15C12.0001 10.47 12.4201 10.11 12.8401 9.82001C13.2501 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.9201 6.85999 12.0001 6.85999C11.0801 6.85999 10.3401 7.60002 10.3401 8.52002" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.9955 13.75H12.0045" stroke="#16192C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className='hover:cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0201 2.91C8.71009 2.91 6.02009 5.6 6.02009 8.91V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91C18.0201 5.61 15.3201 2.91 12.0201 2.91Z" stroke="#16192C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                        <path d="M13.8699 3.2C13.5599 3.11 13.2399 3.04 12.9099 3C11.9499 2.88 11.0299 2.95 10.1699 3.2C10.4599 2.46 11.1799 1.94 12.0199 1.94C12.8599 1.94 13.5799 2.46 13.8699 3.2Z" stroke="#16192C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.90002 21.18C9.36002 20.64 9.02002 19.88 9.02002 19.06" stroke="#16192C" stroke-width="1.5" stroke-miterlimit="10" />
                    </svg>
                </div>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
            </div>
        </div >
    );
}