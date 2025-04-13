import { Document } from "@prisma/client";
import { fetchDoc } from "@/actions/fetchDoc";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { DMSans } from "@/lib/fonts";
import PdfView from "@/components/PdfView";
import { Separator } from "@/components/ui/separator";

type Author = {
    email: string;
    id: string;
    username: string;
}


type UnlockedBy = Author;

type DocumentWithAuthorUnlockedBy = Document & {
    author: Author;
    unlockedBy: UnlockedBy | null;
};

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) {
        redirect("/signin");
    }
    // console.log("userId: ", userId);
    // return (<p>{userId}</p>)

    const { id } = await params;

    const document: DocumentWithAuthorUnlockedBy = await fetchDoc(id, userId as string);

    return (
        <>
            <Header docProps={document} userId={userId} />
            <div className="h-full flex flex-col md:flex-row gap-6 px-2 lg:px-20 py-10 bg-[#F5F3EF]">
                <div className="bg-white sm:px-8 px-2 pt-8 pb-8 sm:rounded-[40px] rounded-2xl md:w-3/4 w-full h-full space-y-6">
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
                    <div className="bg-[#F5F3EF] p-4 rounded-2xl h-fit">
                        <PdfView document={document} />
                    </div>
                </div>
                <div className="bg-white md:w-1/4 md:min-w-[300px] w-full h-fit rounded-[25px] space-y-4 px-4 py-6">
                    <button className="h-[50px] w-full rounded-full bg-[#A414D5] hover:bg-[#be63dc] text-white">
                        <div className="flex gap-2 justify-center items-center h-full">
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8335 25.6667H8.16683C3.50016 25.6667 2.3335 24.5 2.3335 19.8334V17.5C2.3335 12.8334 3.50016 11.6667 8.16683 11.6667H19.8335C24.5002 11.6667 25.6668 12.8334 25.6668 17.5V19.8334C25.6668 24.5 24.5002 25.6667 19.8335 25.6667Z" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 11.6666V9.33331C7 5.47165 8.16667 2.33331 14 2.33331C19.25 2.33331 21 4.66665 21 8.16665" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.0002 21.5833C15.611 21.5833 16.9168 20.2775 16.9168 18.6667C16.9168 17.0558 15.611 15.75 14.0002 15.75C12.3893 15.75 11.0835 17.0558 11.0835 18.6667C11.0835 20.2775 12.3893 21.5833 14.0002 21.5833Z" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Unlock
                        </div>
                    </button>
                    <div className={`${DMSans.className} font-medium mt-5 flex flex-col gap-3`}>
                        <p className="flex gap-2">
                            <span><svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.3994 12.9737C24.3994 18.6787 20.2577 24.022 14.5994 25.5854C14.2144 25.6904 13.7944 25.6904 13.4094 25.5854C7.75103 24.022 3.60938 18.6787 3.60938 12.9737V7.85201C3.60938 6.89535 4.33273 5.81035 5.23106 5.44868L11.7294 2.78872C13.1877 2.19372 14.8327 2.19372 16.291 2.78872L22.7894 5.44868C23.676 5.81035 24.4111 6.89535 24.4111 7.85201L24.3994 12.9737Z" stroke="#A414D5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.0028 14.582C15.2914 14.582 16.3361 13.5373 16.3361 12.2487C16.3361 10.96 15.2914 9.91534 14.0028 9.91534C12.7141 9.91534 11.6694 10.96 11.6694 12.2487C11.6694 13.5373 12.7141 14.582 14.0028 14.582Z" stroke="#A414D5" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14.0029 14.582V18.082" stroke="#A414D5" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </span>
                            Only on Studyloop</p>
                        <p className="flex gap-2">
                            <span><svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.6693 12.932V14.0054C25.6678 16.5212 24.8532 18.9692 23.3468 20.9842C21.8405 22.9992 19.7231 24.4733 17.3105 25.1866C14.8979 25.8999 12.3194 25.8143 9.95949 24.9424C7.59957 24.0705 5.5847 22.4592 4.21539 20.3486C2.84608 18.2381 2.19569 15.7414 2.36123 13.2311C2.52676 10.7207 3.49935 8.33109 5.13393 6.41863C6.76852 4.50616 8.97752 3.17332 11.4315 2.61888C13.8855 2.06444 16.4529 2.3181 18.7509 3.34204M25.6693 4.66536L14.0026 16.3437L10.5026 12.8437" stroke="#A414D5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </span>
                            Original Template</p>
                        <p className="flex gap-2">
                            <span><svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.5 17.5V18.9C24.5 20.8602 24.5 21.8403 24.1185 22.589C23.783 23.2475 23.2475 23.783 22.589 24.1185C21.8403 24.5 20.8602 24.5 18.9 24.5H9.1C7.13982 24.5 6.15972 24.5 5.41103 24.1185C4.75247 23.783 4.21703 23.2475 3.88148 22.589C3.5 21.8403 3.5 20.8602 3.5 18.9V17.5M19.8333 11.6667L14 17.5M14 17.5L8.16667 11.6667M14 17.5V3.5" stroke="#A414D5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </span>
                            Downloadable</p>
                    </div>
                    <Separator className="" />
                    <div className={`${DMSans.className} font-light flex flex-col gap-3`}>
                        <p className="flex gap-2 text-[#6B7B93]">Content Type:
                            <span className={`font-medium text-black`}> {document.ContentType || 'User Generated'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Words:
                            <span className={`font-medium text-black`}> {document.WordCount || 'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Pages:
                            <span className={`font-medium text-black`}> {document.Pages || 'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Level:
                            <span className={`font-medium text-black`}> {document.Level || 'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Language:
                            <span className={`font-medium text-black`}> {document.Language || 'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Reference List:
                            <span className={`font-medium text-black`}> {'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Formatting:
                            <span className={`font-medium text-black`}> {'AMA'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Uploaded By:
                            <span className={`font-medium text-black`}> {document.author.username || 'N/A'}</span>
                        </p>
                        <p className="flex gap-2 text-[#6B7B93]">Date:
                            <span className={`font-medium text-black`}> {document.createdAt ? new Date(document.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}