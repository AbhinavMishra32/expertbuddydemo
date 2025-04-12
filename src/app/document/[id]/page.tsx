import { Document } from "@prisma/client";
import { fetchDoc } from "@/actions/fetchDoc";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/header";
export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) {
        redirect("/signin");
    }
    // console.log("userId: ", userId);
    // return (<p>{userId}</p>)

    const { id } = await params;

    const document: Document = await fetchDoc(id, userId as string);

    return (
        <>
            <Header id={""} url={""} unlockedById={null} textContent={""} title={""} category={""} subject={"Mathematics"} description={null} tags={[]} authorId={""} authorExtId={""} ContentType={null} WordCount={null} Pages={null} Level={null} Language={null} createdAt={undefined} updatedAt={undefined} />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Document Page</h1>
                {id && <p className="text-lg">Document ID: {id}</p>}
                {document && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Document Details</h2>
                        <p className="text-gray-700">Title: {document.title}</p>
                        <p className="text-gray-700">Description: {document.description}</p>
                        <p className="text-gray-700">Word Count: {document.WordCount}</p>
                        <p className="text-gray-700">Page Count: {document.Pages}</p>
                    </div>
                )}
                <p className="text-gray-600 mt-4">Author: {document.authorExtId}</p>
                <p className="text-gray-600">Created At: {new Date(document.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600">Updated At: {new Date(document.updatedAt).toLocaleDateString()}</p>
                <p className="text-gray-600">Tags: {document.tags.join(", ")}</p>
                <p className="text-gray-600">Category: {document.category}</p>
                <p className="text-gray-600">Subject: {document.subject}</p>
                {/* <p className="text-gray-600">Language: {document.language}</p> */}
                {/* <p className="text-gray-600">File URL: {document.url}</p> */}
                <p className="text-gray-600">Text Content: {document.textContent}</p>
                {/* <p className="text-gray-600">Unlocked By: {document.unlockedById}</p> */}
                <p>---------------------------</p>
                {document.authorExtId === userId && (
                    <div className="mt-4">
                        <p className="text-gray-700">You are the author of this document.</p>
                    </div>
                )}
            </div>
        </>
    )
}