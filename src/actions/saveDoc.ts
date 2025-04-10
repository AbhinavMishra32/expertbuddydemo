'use server';
import { prisma } from "@/lib/db";

export type docDataType = {
    textContent: string;
    tags: string[];
    category: string;
    subject: string;
    description: string;
    fileUrl: string;
    title: string;
    language: string;
}

export async function saveDoc(userId: string, docData: docDataType){
    const { textContent, tags, title, category, subject, description, fileUrl, language } = docData;
    try {
        console.log("extId: ", userId);
        const user = await prisma.user.findUnique({
            where: { extId: userId },
          });
          console.log("userId: ", user.id);

        if (!user) {
            throw new Error("Invalid userId: No such user exists");
        }

        const doc = await prisma.document.create({
            data: {
                authorId: user.id,
                textContent,
                tags,
                category,
                description,
                url: fileUrl,
                title: title || "Untitled Document", // Required field in schema
                subject: subject || "Untitled Document", // Required field in schema
            },
        });
        return doc;
    } catch (error) {
        console.error("Error saving document:", error);
        throw new Error("Failed to save document");
    }
}