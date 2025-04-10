'use server'

import { cookies } from "next/headers";

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('token')
    cookieStore.delete('userToken')
    // window.location.href = '/';
}
