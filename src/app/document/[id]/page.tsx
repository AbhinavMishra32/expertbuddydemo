import { Document } from "@prisma/client";
import { fetchDoc } from "@/actions/fetchDoc";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { DMSans } from "@/lib/fonts";
import PdfView from "@/components/PdfView";
import { Separator } from "@/components/ui/separator";
import SignUpButton from "@/components/signupButton";

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
    // console.log("userId: ", userId);
    // return (<p>{userId}</p>)

    const { id } = await params;

    const document: DocumentWithAuthorUnlockedBy = await fetchDoc(id, userId as string);

    return (
        <>
            <Header docProps={document} userId={userId ? userId : ""} />
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
                        {!userId ? (
                            <div className="relative">
                                <div className={`${DMSans.className} absolute inset-0 w-full h-full bg-white/50 backdrop-blur-md flex flex-col items-center justify-center z-10 rounded-2xl`}>
                                    <div className="lg:w-[80%] lg:max-w-[600px] lg:h-fit w-[300px] h-fit shadow-xl bg-white rounded-[30px] flex flex-col gap-4 justify-center items-center p-8">
                                        <svg width="74" height="88" viewBox="0 0 74 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9161 9.83203H63.7028C64.5006 9.83356 65.2653 10.1512 65.8295 10.7153C66.3936 11.2795 66.7112 12.0442 66.7127 12.842V77.9839C66.7112 78.7821 66.3938 79.5473 65.8298 80.1122C65.2658 80.6771 64.501 80.9956 63.7028 80.9983H11.9161C11.1179 80.9956 10.3531 80.6771 9.78913 80.1122C9.22512 79.5473 8.90769 78.7821 8.90625 77.9839V12.842C8.90774 12.0442 9.22532 11.2795 9.78945 10.7153C10.3536 10.1512 11.1183 9.83356 11.9161 9.83203Z" fill="#FF3D50" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.353 2.45262L70.5658 10.3075C71.4316 10.4301 72.2129 10.8909 72.7387 11.5887C73.2645 12.2866 73.4919 13.1648 73.3711 14.0309L63.3772 84.7332C63.2532 85.5994 62.7912 86.3818 62.0923 86.9093C61.3935 87.4368 60.5145 87.6666 59.6477 87.5484L3.43487 79.6935C2.56882 79.5696 1.78762 79.1078 1.26206 78.4092C0.736504 77.7106 0.509341 76.8319 0.63024 75.9653L10.6242 5.26302C10.7482 4.39733 11.2102 3.61551 11.9091 3.08876C12.608 2.56201 13.4868 2.33327 14.353 2.45262Z" fill="black" fill-opacity="0.06" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.915 12.4492H63.7017C63.8062 12.4501 63.9061 12.4922 63.9795 12.5665C64.053 12.6407 64.0941 12.741 64.0939 12.8455V77.9873C64.0941 78.0917 64.053 78.1918 63.9797 78.266C63.9064 78.3402 63.8067 78.3824 63.7024 78.3834H11.915C11.8632 78.3833 11.812 78.373 11.7643 78.353C11.7165 78.3329 11.6732 78.3037 11.6368 78.2669C11.6004 78.2301 11.5717 78.1864 11.5522 78.1384C11.5328 78.0905 11.523 78.0391 11.5235 77.9873V12.8455C11.523 12.7937 11.5328 12.7424 11.5522 12.6944C11.5717 12.6464 11.6004 12.6028 11.6368 12.5659C11.6732 12.5291 11.7165 12.4999 11.7643 12.4799C11.812 12.4599 11.8632 12.4493 11.915 12.4492Z" fill="#D5E3F2" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3141 6.04385H32.763C32.7593 5.37923 32.887 4.72043 33.1388 4.10533C33.3905 3.49023 33.7614 2.93097 34.2301 2.45969C34.6987 1.98842 35.2559 1.61443 35.8696 1.35923C36.4833 1.10403 37.1414 0.972656 37.806 0.972656C38.4706 0.972656 39.1287 1.10403 39.7424 1.35923C40.3561 1.61443 40.9133 1.98842 41.382 2.45969C41.8506 2.93097 42.2215 3.49023 42.4733 4.10533C42.725 4.72043 42.8528 5.37923 42.8491 6.04385H52.293C52.4389 6.04369 52.5834 6.07232 52.7183 6.1281C52.8531 6.18389 52.9757 6.26573 53.0788 6.36895C53.182 6.47216 53.2638 6.59471 53.3195 6.72959C53.3752 6.86446 53.4038 7.00901 53.4036 7.15495V11.8906C53.4032 12.1851 53.2861 12.4675 53.0778 12.6758C52.8695 12.8841 52.5872 13.0013 52.2927 13.0017H23.3141C23.0198 13.0005 22.7379 12.883 22.5298 12.6749C22.3217 12.4668 22.2043 12.1849 22.2031 11.8906V7.15495C22.2035 6.86041 22.3207 6.57804 22.5289 6.36975C22.7372 6.16146 23.0195 6.04427 23.3141 6.04385Z" fill="#3F5163" />
                                            <path d="M33.9766 24.7227C33.6782 24.7227 33.392 24.6041 33.1811 24.3932C32.9701 24.1822 32.8516 23.896 32.8516 23.5977C32.8516 23.2993 32.9701 23.0131 33.1811 22.8022C33.392 22.5912 33.6782 22.4727 33.9766 22.4727H58.6016C58.8999 22.4727 59.1861 22.5912 59.3971 22.8022C59.608 23.0131 59.7266 23.2993 59.7266 23.5977C59.7266 23.896 59.608 24.1822 59.3971 24.3932C59.1861 24.6041 58.8999 24.7227 58.6016 24.7227H33.9766ZM33.9766 63.573C33.6782 63.573 33.392 63.4544 33.1811 63.2435C32.9701 63.0325 32.8516 62.7463 32.8516 62.448C32.8516 62.1496 32.9701 61.8635 33.1811 61.6525C33.392 61.4415 33.6782 61.323 33.9766 61.323H49.9275C50.2259 61.323 50.512 61.4415 50.723 61.6525C50.934 61.8635 51.0525 62.1496 51.0525 62.448C51.0525 62.7463 50.934 63.0325 50.723 63.2435C50.512 63.4544 50.2259 63.573 49.9275 63.573H33.9766ZM33.9766 71.1545C33.6782 71.1545 33.392 71.036 33.1811 70.825C32.9701 70.6141 32.8516 70.3279 32.8516 70.0295C32.8516 69.7312 32.9701 69.445 33.1811 69.234C33.392 69.0231 33.6782 68.9045 33.9766 68.9045H51.0522C51.3506 68.9045 51.6367 69.0231 51.8477 69.234C52.0587 69.445 52.1772 69.7312 52.1772 70.0295C52.1772 70.3279 52.0587 70.6141 51.8477 70.825C51.6367 71.036 51.3506 71.1545 51.0522 71.1545H33.9766ZM33.9766 44.1478C33.6782 44.1478 33.392 44.0293 33.1811 43.8183C32.9701 43.6073 32.8516 43.3212 32.8516 43.0228C32.8516 42.7244 32.9701 42.4383 33.1811 42.2273C33.392 42.0163 33.6782 41.8978 33.9766 41.8978H55.6147C55.9131 41.8978 56.1992 42.0163 56.4102 42.2273C56.6212 42.4383 56.7397 42.7244 56.7397 43.0228C56.7397 43.3212 56.6212 43.6073 56.4102 43.8183C56.1992 44.0293 55.9131 44.1478 55.6147 44.1478H33.9766ZM33.9766 51.7294C33.6782 51.7294 33.392 51.6108 33.1811 51.3999C32.9701 51.1889 32.8516 50.9027 32.8516 50.6044C32.8516 50.306 32.9701 50.0199 33.1811 49.8089C33.392 49.5979 33.6782 49.4794 33.9766 49.4794H53.1284C53.4268 49.4794 53.713 49.5979 53.9239 49.8089C54.1349 50.0199 54.2534 50.306 54.2534 50.6044C54.2534 50.9027 54.1349 51.1889 53.9239 51.3999C53.713 51.6108 53.4268 51.7294 53.1284 51.7294H33.9766ZM33.9766 32.3042C33.6782 32.3042 33.392 32.1857 33.1811 31.9747C32.9701 31.7637 32.8516 31.4776 32.8516 31.1792C32.8516 30.8809 32.9701 30.5947 33.1811 30.3837C33.392 30.1727 33.6782 30.0542 33.9766 30.0542H58.6016C58.8999 30.0542 59.1861 30.1727 59.3971 30.3837C59.608 30.5947 59.7266 30.8809 59.7266 31.1792C59.7266 31.4776 59.608 31.7637 59.3971 31.9747C59.1861 32.1857 58.8999 32.3042 58.6016 32.3042H33.9766Z" fill="#3F5163" />
                                            <path d="M17.0156 22.5312H26.7281V32.2439H17.0156V22.5312Z" fill="#69A7FF" />
                                            <path d="M17.0156 41.957H26.7281V51.6697H17.0156V41.957Z" fill="#FFAB02" />
                                            <path d="M17.0156 61.3828H26.7281V71.0953H17.0156V61.3828Z" fill="#FF3D50" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M60.8095 63.776L71.9017 29.9208C72.0647 29.429 72.129 28.9099 72.091 28.3932C72.0529 27.8765 71.9133 27.3724 71.68 26.9098C71.4466 26.4472 71.1243 26.0352 70.7315 25.6975C70.3386 25.3597 69.8829 25.1029 69.3905 24.9416C68.8982 24.7804 68.3788 24.7179 67.8623 24.7578C67.3457 24.7977 66.8421 24.9392 66.3804 25.1741C65.9186 25.409 65.5078 25.7328 65.1714 26.1269C64.8351 26.521 64.5798 26.9776 64.4203 27.4705L53.3281 61.3255L54.6167 70.0319L60.8095 63.776Z" fill="#FFAB02" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M71.7397 30.4294L71.9036 29.9194C72.2285 28.9273 72.146 27.8467 71.6742 26.9153C71.2024 25.984 70.38 25.2783 69.3878 24.9533C68.3957 24.6284 67.3151 24.7109 66.3837 25.1827C65.4524 25.6545 64.7467 26.4769 64.4217 27.4691L64.2578 27.9746L71.7397 30.4294Z" fill="#69A7FF" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M60.8095 63.7741L53.3281 61.3242L54.6167 70.0306L60.8095 63.7741Z" fill="#3F5163" />
                                            <path d="M23.1275 25.1419C23.2318 25.0372 23.3557 24.9542 23.4922 24.8974C23.6287 24.8407 23.775 24.8113 23.9227 24.8111C24.0705 24.8109 24.2169 24.8398 24.3535 24.8962C24.4901 24.9525 24.6143 25.0353 24.7189 25.1396C24.8236 25.244 24.9067 25.3679 24.9634 25.5044C25.0202 25.6408 25.0495 25.7871 25.0497 25.9349C25.0499 26.0827 25.021 26.229 24.9646 26.3657C24.9083 26.5023 24.8256 26.6264 24.7212 26.7311L21.8161 29.6363C21.6049 29.8462 21.3192 29.964 21.0214 29.964C20.7237 29.964 20.438 29.8462 20.2268 29.6363L19.0339 28.4431C18.8267 28.2317 18.7113 27.947 18.7128 27.6509C18.7143 27.3548 18.8326 27.0713 19.042 26.862C19.2513 26.6527 19.5348 26.5344 19.8309 26.5329C20.127 26.5314 20.4116 26.6468 20.6231 26.8541L21.0192 27.2502L23.1275 25.1419ZM23.1275 44.567C23.2318 44.4624 23.3557 44.3793 23.4921 44.3225C23.6285 44.2658 23.7748 44.2364 23.9225 44.2362C24.0703 44.236 24.2166 44.2648 24.3532 44.3211C24.4898 44.3775 24.614 44.4601 24.7186 44.5645C24.8233 44.6688 24.9064 44.7927 24.9631 44.9291C25.0199 45.0655 25.0492 45.2118 25.0495 45.3595C25.0497 45.5073 25.0208 45.6536 24.9645 45.7902C24.9082 45.9268 24.8255 46.051 24.7212 46.1556L21.8161 49.0619C21.6049 49.2719 21.3192 49.3898 21.0214 49.3898C20.7236 49.3898 20.438 49.2719 20.2268 49.0619L19.0339 47.8734C18.9292 47.7691 18.8461 47.6451 18.7894 47.5087C18.7327 47.3722 18.7033 47.226 18.7031 47.0782C18.7029 46.9304 18.7318 46.784 18.7882 46.6474C18.8445 46.5108 18.9273 46.3866 19.0316 46.282C19.1359 46.1773 19.2599 46.0942 19.3963 46.0375C19.5328 45.9807 19.6791 45.9514 19.8269 45.9512C19.9747 45.951 20.121 45.9799 20.2576 46.0363C20.3943 46.0926 20.5184 46.1753 20.6231 46.2797L21.0192 46.6758L23.1275 44.567ZM23.1275 63.9922C23.3382 63.7808 23.6242 63.6619 23.9227 63.6614C24.2211 63.661 24.5075 63.7791 24.7189 63.9898C24.9302 64.2006 25.0492 64.4866 25.0496 64.7851C25.0501 65.0835 24.9319 65.3699 24.7212 65.5813L21.8161 68.4864C21.6049 68.6964 21.3192 68.8143 21.0214 68.8143C20.7236 68.8143 20.438 68.6964 20.2268 68.4864L19.0339 67.298C18.8225 67.0872 18.7036 66.8012 18.7031 66.5027C18.7027 66.2042 18.8209 65.9178 19.0316 65.7065C19.2423 65.4951 19.5284 65.3762 19.8269 65.3757C20.1253 65.3753 20.4117 65.4935 20.6231 65.7042L21.0192 66.1005L23.1275 63.9922ZM37.8034 6.41797C37.6557 6.41797 37.5094 6.38887 37.3729 6.33233C37.2364 6.2758 37.1124 6.19293 37.0079 6.08846C36.9034 5.984 36.8206 5.85998 36.764 5.72349C36.7075 5.587 36.6784 5.44071 36.6784 5.29297C36.6784 5.14523 36.7075 4.99894 36.764 4.86245C36.8206 4.72596 36.9034 4.60194 37.0079 4.49747C37.1124 4.39301 37.2364 4.31014 37.3729 4.2536C37.5094 4.19707 37.6557 4.16797 37.8034 4.16797H37.8261C38.1244 4.16797 38.4106 4.2865 38.6215 4.49747C38.8325 4.70845 38.9511 4.9946 38.9511 5.29297C38.9511 5.59134 38.8325 5.87749 38.6215 6.08846C38.4106 6.29944 38.1244 6.41797 37.8261 6.41797H37.8034Z" fill="#D5E3F2" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1877 77.9833V12.8414C14.1878 12.7089 14.1969 12.5766 14.215 12.4453H11.915C11.8632 12.4454 11.812 12.4558 11.7643 12.4758C11.7165 12.4958 11.6732 12.5251 11.6368 12.5619C11.6004 12.5987 11.5717 12.6423 11.5522 12.6903C11.5328 12.7383 11.523 12.7896 11.5235 12.8414V77.9833C11.523 78.035 11.5328 78.0864 11.5522 78.1344C11.5717 78.1823 11.6004 78.226 11.6368 78.2628C11.6732 78.2996 11.7165 78.3289 11.7643 78.3489C11.812 78.3689 11.8632 78.3793 11.915 78.3794H14.2145C14.1964 78.2481 14.1873 78.1158 14.1872 77.9833H14.1877Z" fill="#B7CFE8" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5245 77.9839V12.842C11.5241 12.7903 11.5338 12.7389 11.5533 12.6909C11.5727 12.643 11.6015 12.5993 11.6379 12.5625C11.6743 12.5257 11.7176 12.4964 11.7653 12.4764C11.8131 12.4564 11.8643 12.4461 11.9161 12.4459H14.2156C14.3128 11.7233 14.6684 11.0603 15.2168 10.5798C15.7651 10.0992 16.469 9.83354 17.1981 9.83203H11.9169C11.1189 9.83335 10.354 10.1509 9.78972 10.7151C9.22543 11.2792 8.90774 12.0441 8.90625 12.842V77.9839C8.90769 78.7821 9.22512 79.5473 9.78913 80.1122C10.3531 80.6771 11.1179 80.9956 11.9161 80.9983H17.1973C16.4678 80.9957 15.7639 80.7291 15.2156 80.2478C14.6674 79.7665 14.3119 79.1031 14.2148 78.38H11.9161C11.8643 78.3799 11.8131 78.3695 11.7653 78.3495C11.7176 78.3295 11.6743 78.3002 11.6379 78.2634C11.6015 78.2266 11.5727 78.183 11.5533 78.135C11.5338 78.087 11.5241 78.0357 11.5245 77.9839Z" fill="#E82E41" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0745 9.83156V6.04297H23.3141C23.0195 6.04338 22.7372 6.16058 22.5289 6.36887C22.3207 6.57715 22.2035 6.85952 22.2031 7.15406V11.8897C22.2067 12.1832 22.3249 12.4637 22.5325 12.6713C22.74 12.8789 23.0205 12.9971 23.3141 13.0008H52.2925C52.5869 13 52.869 12.8826 53.0772 12.6744C53.2854 12.4662 53.4027 12.1841 53.4034 11.8897V11.0155H25.1811C24.8872 11.0141 24.6058 10.8964 24.3984 10.6881C24.1911 10.4799 24.0746 10.198 24.0745 9.90406V9.83156ZM55.967 62.192L53.3216 61.3222L54.6102 70.0286L56.8005 67.8155L55.967 62.192Z" fill="#2C3947" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M53.3281 61.3222L55.9736 62.192L64.097 37.3983L66.7153 29.4069L66.902 28.8423L66.7153 28.7786L64.2564 27.9727L64.097 28.4508L53.3281 61.3222Z" fill="#ED9E00" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.2578 27.9746L66.7167 28.7805L66.9034 28.8443L67.0678 28.3388C67.3192 27.5781 67.7945 26.911 68.4315 26.4251C69.0686 25.9392 69.8375 25.6571 70.6377 25.6158C70.14 25.2173 69.5532 24.9453 68.9274 24.8231C68.3016 24.7009 67.6556 24.7322 67.0445 24.9144C66.4335 25.0965 65.8757 25.424 65.4189 25.8688C64.9622 26.3136 64.62 26.8625 64.4217 27.4685L64.2578 27.9746Z" fill="#5F96E6" />
                                        </svg>
                                        <div className="lg:text-5xl text-2xl font-semibold text-center tracking-tighter">Sign up to View the full document!</div>
                                        <p className="text-center text-[#6B7B93] lg:font-light font-extralight lg:text-base text-sm">Lorem ipsum dolor sit amet consectetur. Mi nisl sit feugiat fringilla morbi. Egestas vestibulum leo curabitur eget a commodo.</p>
                                        <SignUpButton />
                                    </div>
                                </div>
                                <div className="filter blur-sm">
                                    <PdfView document={document} />
                                </div>
                            </div>
                        ) : (
                            <PdfView document={document} />
                        )}
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