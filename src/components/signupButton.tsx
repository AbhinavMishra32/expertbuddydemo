'use client';
import { useRouter } from "next/navigation";
export default function SignUpButton() {
    const router = useRouter();
    return (
        <button className="flex gap-2 justify-center items-center bg-[#A414D5] rounded-full py-3 px-4 text-white w-full" onClick={() => router.push('/signup')}>
            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.3333 25.6666H8.66659C3.99992 25.6666 2.83325 24.5 2.83325 19.8333V17.5C2.83325 12.8333 3.99992 11.6666 8.66659 11.6666H20.3333C24.9999 11.6666 26.1666 12.8333 26.1666 17.5V19.8333C26.1666 24.5 24.9999 25.6666 20.3333 25.6666Z" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.5 11.6667V9.33337C7.5 5.47171 8.66667 2.33337 14.5 2.33337C19.75 2.33337 21.5 4.66671 21.5 8.16671" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.4999 21.5833C16.1107 21.5833 17.4166 20.2775 17.4166 18.6667C17.4166 17.0558 16.1107 15.75 14.4999 15.75C12.8891 15.75 11.5833 17.0558 11.5833 18.6667C11.5833 20.2775 12.8891 21.5833 14.4999 21.5833Z" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Sign Up</span>
        </button>
    );
}