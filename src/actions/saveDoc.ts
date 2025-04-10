'use server';
import { prisma } from "@/lib/db";

export type docDataType = {
    textContent: string;
    tags: string[];
    category: string;
    subject: string;
    description: string;
    fileUrl: string;
    ContentType: string;
}

export async function saveDoc(userId: string, docData: docDataType){

}