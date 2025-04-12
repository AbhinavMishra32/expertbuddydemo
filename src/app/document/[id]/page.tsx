import { Document } from "@prisma/client";
import { fetchDoc } from "@/actions/fetchDoc";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { DMSans } from "@/lib/fonts";
import PdfView from "@/components/PdfView";

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
            <div className="h-screen w-screen">
                <Header docProps={document} />
                <div className="h-full flex flex-col md:flex-row gap-6 px-6 md:px-20 py-10 bg-[#F5F3EF]">
                    <div className="bg-white px-8 pt-8 rounded-[40px] md:w-3/4 w-full h-full space-y-6">
                        <div className="flex justify-center items-center h-10">
                            <h1 className={`${DMSans.className} w-[50%] h-full text-2xl font-bold flex items-center`}>{document.title}</h1>
                            <div className="w-[50%] h-full flex justify-end items-center">
                                {document.tags.map((tag, index) => (
                                    <span key={index} className="bg-[#CFD7E6] h-full flex items-center w-fit text-sm font-semibold text-gray-700 px-4 py-1 rounded-full mr-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-2 align-middle"></span>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-[#F5F3EF]">
                            <PdfView document={document} />
                        </div>
                    </div>
                    <div className="bg-white md:w-1/4 w-full h-full space-y-4"></div>
                </div>
            </div>
        </>
    )
}