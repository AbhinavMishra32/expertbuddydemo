'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCheck = ({ children, userToken }: { children: React.ReactNode, userToken: string | null }) => {
    const router = useRouter();

    useEffect(() => {
        if (!userToken) {
            router.push('/signin');
        }
    })

    return <>{children}</>

}

export default AuthCheck;