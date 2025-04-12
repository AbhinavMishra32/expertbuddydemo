'use server';
import { prisma } from "@/lib/db";
import { Document, Tags } from "@prisma/client";
import { Subject } from "@prisma/client";

// export type docDataType = {
//     textContent: string;
//     tags: Tags[];
//     category: string;
//     subject: Subject;
//     description: string;
//     fileUrl: string;
//     title: string;
//     language: string;
//     wordCount: number;
//     pageCount: number;
// }

export async function saveDoc(userId: string, docData: Document) {
    const { textContent, tags, title, category, subject, description, url, Language, WordCount, Pages } = docData;
    try {
        console.log("extId: ", userId);
        const user = await prisma.user.findUnique({
            where: { extId: userId },
        });
        console.log("userId: ", user?.id);

        if (!user) {
            throw new Error("Invalid userId: No such user exists");
        }

        const doc = await prisma.document.create({
            data: {
                authorId: user.id,
                authorExtId: userId,
                textContent,
                tags,
                category,
                description,
                url: url,
                title: title || "Untitled Document",
                subject: subject || "Untitled Document",
                WordCount: textContent ? textContent.split(" ").length : WordCount,
                Pages: Pages || 0,
            },
        });
        return doc;
    } catch (error) {
        console.error("Error saving document:", error);
        throw new Error("Failed to save document");
    }
}