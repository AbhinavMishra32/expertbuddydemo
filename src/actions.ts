'use server'

import { cookies } from "next/headers";
import { prisma } from "./lib/db";

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('token')
    cookieStore.delete('userToken')
    // window.location.href = '/';
}

export async function getUsers(){
    const users = await prisma.user.findMany();
    // console.log(users);
    return users
}