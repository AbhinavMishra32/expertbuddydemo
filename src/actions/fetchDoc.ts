'use server';

import { prisma } from "@/lib/db";

export async function fetchDoc(docId: string, userId: string) {
    if (!docId) {
        throw new Error("Document ID is required");
    }
    if (!userId) {
        throw new Error("User ID is required");
    }
    try {
        const document = await prisma.document.findUnique({
            where: { id: docId },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                unlockedBy: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                }
            },
        });
        if (!document) {
            throw new Error("Document not found");
        }
        return {
            ...document,
        }

    } catch (error) {
        console.error('Error fetching document:', error);
        throw new Error('Failed to fetch document');
    }
}