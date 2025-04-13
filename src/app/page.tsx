"use client"

import type React from "react"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Search } from "lucide-react"
import { getFilteredDocuments } from "@/actions/getFilteredDocs"
import { useRouter, useSearchParams } from "next/navigation"
import { Document, Subject } from '@prisma/client'
import HeaderHomePage from "@/components/HeaderHomePage"
import { DMSans, manrope } from "@/lib/fonts"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs"
import UserBar from "@/components/UserBar"

function HomePage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { isLoaded, user } = useUser();

    const [docs, setDocs] = useState<Document[]>([])
    const [filters, setFilters] = useState({
        searchQuery: searchParams.get("search") || "",
        subject: (searchParams.get("subject") as Subject) || undefined,
        category: searchParams.get("category") || "",
        minWords: searchParams.get("minWords") ? Number(searchParams.get("minWords")) : 0,
        maxWords: searchParams.get("maxWords") ? Number(searchParams.get("maxWords")) : 30000,
        page: Number(searchParams.get("page")) || 1,
        pageSize: 8,
    })

    const [totalPages, setTotalPages] = useState(1)
    const [totalDocs, setTotalDocs] = useState(0)
    const [isSearching, setIsSearching] = useState(false)
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)

    const fetchDocs = async () => {
        setIsSearching(true)
        const { docs, totalPages } = await getFilteredDocuments(filters)
        setDocs(docs)
        setTotalPages(totalPages)
        setTotalDocs(totalDocs)
        setIsSearching(false)
    }

    useEffect(() => {
        fetchDocs()
    }, [])

    const updateURL = (updatedFilters: typeof filters) => {
        const params = new URLSearchParams()

        if (updatedFilters.searchQuery) params.set("search", updatedFilters.searchQuery)
        if (updatedFilters.subject) params.set("subject", updatedFilters.subject)
        if (updatedFilters.category) params.set("category", updatedFilters.category)
        if (updatedFilters.minWords > 0) params.set("minWords", updatedFilters.minWords.toString())
        if (updatedFilters.maxWords < 550000) params.set("maxWords", updatedFilters.maxWords.toString())
        if (updatedFilters.page > 1) params.set("page", updatedFilters.page.toString())

        const queryString = params.toString()
        router.push(queryString ? `?${queryString}` : "")
    }

    const handlePageChange = (newPage: number) => {
        const updatedFilters = { ...filters, page: newPage }
        setFilters(updatedFilters)
        setCurrentPage(newPage)
        updateURL(updatedFilters)
        fetchDocs();
        // window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const updatedFilters = { ...filters, page: 1 }
        setFilters(updatedFilters)
        setCurrentPage(1)
        updateURL(updatedFilters)
        fetchDocs();
    }

    const handleApplyFilters = () => {
        const updatedFilters = { ...filters, page: 1 }
        setFilters(updatedFilters)
        setCurrentPage(1)
        updateURL(updatedFilters)
        fetchDocs();
    }

    return (
        <div className="min-h-screen flex flex-col">
            {user && isLoaded && (<UserBar />)}
            {searchParams.get("search") ? (
                <header className={`relative bg-[#A414D5] text-white sm:h-[150px] h-[90px] lg:px-[140px] px-4 overflow-hidden`}>
                    <Image
                        src="/headerimg.png"
                        alt="Header background"
                        fill
                        className="object-cover mix-blend-multiply pointer-events-none opacity-90 z-0"
                    />
                    <div className={`${DMSans.className} flex justify-between items-center h-full`}>
                        <h1 className='w-full sm:text-5xl text-xl font-semibold text-white mr-2'>StudyBank</h1>
                        <div className="w-full flex flex-row gap-3 items-center justify-end text-nowrap">
                            <button className="relative z-10 flex gap-2 font-semibold sm:text-base text-xs w-fit h-fit sm:px-8 sm:py-4 px-4 py-2 bg-white rounded-full text-black">
                                <span>
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 " width="23" height="23" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3307 21.3346C12.3307 19.3096 13.9724 17.668 15.9974 17.668C18.0224 17.668 19.6641 19.3096 19.6641 21.3346C19.6641 23.3597 18.0224 25.0013 15.9974 25.0013C13.9724 25.0013 12.3307 23.3597 12.3307 21.3346ZM15.9974 19.668C15.0769 19.668 14.3307 20.4142 14.3307 21.3346C14.3307 22.2551 15.0769 23.0013 15.9974 23.0013C16.9179 23.0013 17.6641 22.2551 17.6641 21.3346C17.6641 20.4142 16.9179 19.668 15.9974 19.668Z" fill="#A414D5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.9974 10.668C8.9974 6.80198 12.1314 3.66797 15.9974 3.66797C19.2577 3.66797 21.9998 5.89786 22.7769 8.91723C22.9146 9.45208 23.4598 9.77407 23.9946 9.63641C24.5295 9.49874 24.8515 8.95356 24.7138 8.41871C23.7148 4.53716 20.1924 1.66797 15.9974 1.66797C11.0268 1.66797 6.9974 5.69741 6.9974 10.668V12.405C6.69495 12.4263 6.4099 12.4539 6.14173 12.49C4.94159 12.6514 3.93109 12.9965 3.12853 13.7991C2.32598 14.6017 1.98078 15.6122 1.81943 16.8123C1.66401 17.9683 1.66404 19.438 1.66406 21.2615V21.4078C1.66404 23.2312 1.66401 24.701 1.81943 25.857C1.98078 27.0571 2.32598 28.0676 3.12853 28.8702C3.93109 29.6727 4.94159 30.0179 6.14173 30.1793C7.29769 30.3347 8.76745 30.3347 10.5909 30.3346H21.4039C23.2273 30.3347 24.6971 30.3347 25.8531 30.1793C27.0532 30.0179 28.0637 29.6727 28.8663 28.8702C29.6688 28.0676 30.014 27.0571 30.1754 25.857C30.3308 24.701 30.3308 23.2312 30.3307 21.4078V21.2615C30.3308 19.438 30.3308 17.9683 30.1754 16.8123C30.014 15.6122 29.6688 14.6017 28.8663 13.7991C28.0637 12.9965 27.0532 12.6514 25.8531 12.49C24.6971 12.3346 23.2274 12.3346 21.4039 12.3346H10.5909C10.0262 12.3346 9.49543 12.3346 8.9974 12.3392V10.668ZM6.40823 14.4722C5.42986 14.6037 4.91176 14.8443 4.54274 15.2133C4.17373 15.5823 3.93313 16.1004 3.80159 17.0788C3.66619 18.0859 3.66406 19.4207 3.66406 21.3346C3.66406 23.2485 3.66619 24.5833 3.80159 25.5905C3.93313 26.5688 4.17373 27.0869 4.54274 27.456C4.91176 27.825 5.42986 28.0656 6.40822 28.1971C7.41536 28.3325 8.75018 28.3346 10.6641 28.3346H21.3307C23.2446 28.3346 24.5794 28.3325 25.5866 28.1971C26.5649 28.0656 27.083 27.825 27.4521 27.456C27.8211 27.0869 28.0617 26.5688 28.1932 25.5905C28.3286 24.5833 28.3307 23.2485 28.3307 21.3346C28.3307 19.4207 28.3286 18.0859 28.1932 17.0788C28.0617 16.1004 27.8211 15.5823 27.4521 15.2133C27.083 14.8443 26.5649 14.6037 25.5866 14.4722C24.5794 14.3368 23.2446 14.3346 21.3307 14.3346H10.6641C8.75018 14.3346 7.41536 14.3368 6.40823 14.4722Z" fill="#A414D5" />
                                    </svg>
                                </span>
                                Unlocked Docs</button>
                            <button className="relative z-10 flex gap-2 font-semibold sm:text-base text-xs w-fit h-fit sm:px-8 sm:py-4 px-4 py-2 bg-white rounded-full text-black">
                                <span>
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6" width="23" height="23" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3307 21.3346C12.3307 19.3096 13.9724 17.668 15.9974 17.668C18.0224 17.668 19.6641 19.3096 19.6641 21.3346C19.6641 23.3597 18.0224 25.0013 15.9974 25.0013C13.9724 25.0013 12.3307 23.3597 12.3307 21.3346ZM15.9974 19.668C15.0769 19.668 14.3307 20.4142 14.3307 21.3346C14.3307 22.2551 15.0769 23.0013 15.9974 23.0013C16.9179 23.0013 17.6641 22.2551 17.6641 21.3346C17.6641 20.4142 16.9179 19.668 15.9974 19.668Z" fill="#A414D5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.9974 10.668C8.9974 6.80198 12.1314 3.66797 15.9974 3.66797C19.2577 3.66797 21.9998 5.89786 22.7769 8.91723C22.9146 9.45208 23.4598 9.77407 23.9946 9.63641C24.5295 9.49874 24.8515 8.95356 24.7138 8.41871C23.7148 4.53716 20.1924 1.66797 15.9974 1.66797C11.0268 1.66797 6.9974 5.69741 6.9974 10.668V12.405C6.69495 12.4263 6.4099 12.4539 6.14173 12.49C4.94159 12.6514 3.93109 12.9965 3.12853 13.7991C2.32598 14.6017 1.98078 15.6122 1.81943 16.8123C1.66401 17.9683 1.66404 19.438 1.66406 21.2615V21.4078C1.66404 23.2312 1.66401 24.701 1.81943 25.857C1.98078 27.0571 2.32598 28.0676 3.12853 28.8702C3.93109 29.6727 4.94159 30.0179 6.14173 30.1793C7.29769 30.3347 8.76745 30.3347 10.5909 30.3346H21.4039C23.2273 30.3347 24.6971 30.3347 25.8531 30.1793C27.0532 30.0179 28.0637 29.6727 28.8663 28.8702C29.6688 28.0676 30.014 27.0571 30.1754 25.857C30.3308 24.701 30.3308 23.2312 30.3307 21.4078V21.2615C30.3308 19.438 30.3308 17.9683 30.1754 16.8123C30.014 15.6122 29.6688 14.6017 28.8663 13.7991C28.0637 12.9965 27.0532 12.6514 25.8531 12.49C24.6971 12.3346 23.2274 12.3346 21.4039 12.3346H10.5909C10.0262 12.3346 9.49543 12.3346 8.9974 12.3392V10.668ZM6.40823 14.4722C5.42986 14.6037 4.91176 14.8443 4.54274 15.2133C4.17373 15.5823 3.93313 16.1004 3.80159 17.0788C3.66619 18.0859 3.66406 19.4207 3.66406 21.3346C3.66406 23.2485 3.66619 24.5833 3.80159 25.5905C3.93313 26.5688 4.17373 27.0869 4.54274 27.456C4.91176 27.825 5.42986 28.0656 6.40822 28.1971C7.41536 28.3325 8.75018 28.3346 10.6641 28.3346H21.3307C23.2446 28.3346 24.5794 28.3325 25.5866 28.1971C26.5649 28.0656 27.083 27.825 27.4521 27.456C27.8211 27.0869 28.0617 26.5688 28.1932 25.5905C28.3286 24.5833 28.3307 23.2485 28.3307 21.3346C28.3307 19.4207 28.3286 18.0859 28.1932 17.0788C28.0617 16.1004 27.8211 15.5823 27.4521 15.2133C27.083 14.8443 26.5649 14.6037 25.5866 14.4722C24.5794 14.3368 23.2446 14.3346 21.3307 14.3346H10.6641C8.75018 14.3346 7.41536 14.3368 6.40823 14.4722Z" fill="#A414D5" />
                                    </svg>
                                </span>
                                Uploaded Docs
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                <header className={`relative bg-[#A414D5] text-white pt-6 ${user ? "sm:h-[350px]" : "sm:h-[430px]"} h-fit lg:px-[140px] px-4 pb-10 overflow-hidden`}>
                    <Image
                        src="/headerimg.png"
                        alt="Header background"
                        fill
                        className="object-cover mix-blend-multiply pointer-events-none opacity-90 z-0"
                    />
                    <Image
                        src="/heroimage.png"
                        alt="Header background"
                        width={390}
                        height={390}
                        className="absolute bottom-0 md:right-[10%] xl:block hidden z-0"
                    />
                    {!user && isLoaded && (
                        <div className={`${manrope.className} relative z-10 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
                            <div className="xl:w-full w-[40%] h-full flex items-center px-6">
                                <Image src="/logo.png" alt="Logo" width={135} height={60} />
                            </div>
                            <div className="w-full flex gap-7 text-nowrap justify-end items-center p-2">
                                <p className='md:inline hidden'>Find Tutor</p>
                                <p className='md:inline hidden'>Become Tutor</p>
                                <Link href="/signin">
                                <p className='md:inline hidden hover:text-fuchsia-700'>Sign In</p>
                                </Link>
                                <button onClick={() => router.push('/signup')} className="rounded-full sm:text-base text-sm bg-black hover:bg-[#A414D5] text-white h-full px-8">
                                    Get Started For Free
                                </button>
                            </div>
                        </div>
                    )
                    }

                    <div className={`${DMSans.className} mt-10`}>
                        <h1 className='sm:text-5xl text-3xl font-semibold text-white'>Accounting Homework
                            <br />
                            Samples & Study Documents</h1>
                        <p className='sm:text-lg text-sm text-white mt-4 font-light flex gap-3'>Get Access To Our Online Database Of Accounting Writing Samples.</p>
                    </div>
                    <div className={`${DMSans.className} relative z-10 mt-7 flex gap-2 items-center bg-white rounded-full pl-6 pr-2 h-16 w-full max-w-xl shadow-md`}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4175 24.5006C19.5387 24.5006 24.5009 19.5384 24.5009 13.4172C24.5009 7.29607 19.5387 2.33389 13.4175 2.33389C7.29636 2.33389 2.33418 7.29607 2.33418 13.4172C2.33418 19.5384 7.29636 24.5006 13.4175 24.5006Z" stroke="#6B7B93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M25.6678 25.6671L23.3345 23.3338" stroke="#6B7B93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <form onSubmit={handleSearch} className="flex w-full">
                            <input
                                type="text"
                                placeholder="Find any type of work, topic, etc."
                                className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 ml-2"
                                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                            />
                            <button type="submit" className="bg-[#16192C] text-white px-8 py-3 rounded-full ml-2 hover:bg-neutral-700 transition">
                                Search
                            </button>
                        </form>
                    </div>
                </header>
            )}


            {/* Main Content */}
            <main className="flex-grow bg-[#F5F3EF] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center mb-10 h-4 lg:h-20 gap-2">
                        {searchParams.get("search") ? (
                            <div className="relative w-fit h-fit">
                                <h2 className={`${DMSans.className} md:text-4xl sm:text-2xl text-xl flex w-full font-bold text-gray-800`}>
                                    {`Search results for "${searchParams.get("search")}"`}
                                </h2>
                                <p className={`${DMSans.className} text-[#A414D5] text-xl mt-2 font-semibold`}>{docs.length} results</p>
                            </div>
                        ) : (
                            <div className="relative w-fit mx-auto h-fit">
                                <svg className="hidden md:block absolute -top-9 -left-10" width="60" height="73" viewBox="0 0 60 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.7407 71C14.4618 59.7027 5.77095 47.3316 2.11109 34.5969C0.802087 30.0421 11.4709 38.1774 12.6037 38.9965C13.3478 39.5345 13.4157 39.8494 13.5316 38.2869C13.9471 32.6804 13.2265 26.9705 13.0676 21.3626C12.973 18.023 13.3112 17.1471 16.3153 19.4821C20.7802 22.9524 23.7013 27.7832 27.8785 31.4746C29.65 33.04 29.4793 23.0712 29.5559 22.3915C29.9719 18.7008 30.4908 13.0249 32.8036 9.83139C33.5215 8.84008 39.9673 22.4368 41.9757 20.4401C46.119 16.3209 49.9142 11.6819 53.075 6.78004C53.3143 6.4088 56.6438 -0.606002 56.6438 3.05458C56.6438 12.7352 56.7873 21.7588 58 31.4036" stroke="#A414D5" stroke-width="4" stroke-linecap="round" />
                                </svg>
                                <h2 className={`${DMSans.className} md:text-4xl sm:text-2xl text-xl flex justify-center w-full font-bold text-gray-800`}>
                                    {/* {searchParams.get("search") ? `Search results for "${searchParams.get("search")}"` : "Find Writing Inspiration in Our Data Base"} */}
                                    Find Writing Inspiration in Our Data Base
                                </h2>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">

                        {/* Results */}
                        <div className="flex-grow">
                            {isSearching ? (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                                    <p className="text-sm text-gray-500 mt-4">Searching documents...</p>
                                </div>
                            ) : (
                                <>
                                    <div className={`${DMSans.className} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                                        {docs.map((doc: Document) => (
                                            <Link
                                                href={`/document/${doc.id}`}>
                                                <div key={doc.id} className="bg-white ring-2 ring-[#3829A3] ring-opacity-[3%] hover:ring-[#A414D5] rounded-[25px] p-6 hover:shadow-lg transition-shadow">
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
                                                    <p className="text-[#727982] text-sm font-light mb-4 line-clamp-6">{doc.textContent}</p>
                                                    <Separator className="bg-[#E1D5C9]" />

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 12.2H15" stroke="#A414D5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M8 16.2H12.38" stroke="#A414D5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z" stroke="#A414D5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002" stroke="#A414D5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <span className="text-sm ">Words: <span className="font-semibold text-black">{doc.WordCount}</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M17 13.4H13.8C11.4 13.4 10.6 12.6 10.6 10.2V7L17 13.4Z" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M11.6 2H15.6" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M7 5C7 3.34 8.34 2 10 2H12.62" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M22 8V14.19C22 15.74 20.74 17 19.19 17" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z" stroke="#A414D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <span className="text-sm text-[#6B7B93]">Pages: <span className="font-semibold text-black">{String(doc.Pages).padStart(2, "0")}</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-12">
                                            <nav className="flex items-center gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md"
                                                    onClick={() => handlePageChange(1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronsLeft className="h-4 w-4" />
                                                    <span className="sr-only">First</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                    <span className="sr-only">Previous</span>
                                                </Button>

                                                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                                    let pageNumber
                                                    if (totalPages <= 5) {
                                                        pageNumber = i + 1
                                                    } else if (currentPage <= 3) {
                                                        pageNumber = i + 1
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNumber = totalPages - 4 + i
                                                    } else {
                                                        pageNumber = currentPage - 2 + i
                                                    }

                                                    return (
                                                        <Button
                                                            key={i}
                                                            variant={currentPage === pageNumber ? "default" : "outline"}
                                                            className={`h-8 w-8 rounded-md ${currentPage === pageNumber ? "bg-purple-600 text-white" : ""
                                                                }`}
                                                            onClick={() => handlePageChange(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </Button>
                                                    )
                                                })}

                                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                                    <>
                                                        <span className="mx-1">...</span>
                                                        <Button
                                                            variant="outline"
                                                            className="h-8 w-8 rounded-md"
                                                            onClick={() => handlePageChange(totalPages)}
                                                        >
                                                            {totalPages}
                                                        </Button>
                                                    </>
                                                )}

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                    <span className="sr-only">Next</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-md"
                                                    onClick={() => handlePageChange(totalPages)}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    <ChevronsRight className="h-4 w-4" />
                                                    <span className="sr-only">Last</span>
                                                </Button>
                                            </nav>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {/* Filters */}
                        <div className={`${DMSans.className} w-full md:w-72 md:min-w-72 space-y-6 bg-white py-6 px-4 rounded-[25px] h-fit`}>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Type of work</label>
                                <Select
                                    defaultValue={filters.category || "all"}
                                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                                >
                                    <SelectTrigger className="w-full h-12 rounded-[12px]">
                                        <SelectValue placeholder="All Project Types" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[12px]">
                                        <SelectItem value="all">All Project Types</SelectItem>
                                        <SelectItem value="essay">Essay</SelectItem>
                                        <SelectItem value="research">Research Paper</SelectItem>
                                        <SelectItem value="case">Case Study</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Subject</label>
                                <Select
                                    onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value as Subject }))}
                                >
                                    <SelectTrigger className="w-full h-12 rounded-[12px]">
                                        <SelectValue placeholder={searchParams.get("subject") ? searchParams.get("subject") : "Filter by subject"} defaultValue={searchParams.get("subject") || ""} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[12px]">
                                        {Object.values(Subject).map((subject) => (
                                            <SelectItem key={subject} value={subject}>
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Type of work</label>
                                <Select defaultValue="any">
                                    <SelectTrigger className="w-full h-12 rounded-[12px]">
                                        <SelectValue placeholder="Any Academic Level" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[12px]">
                                        <SelectItem value="any">Any Academic Level</SelectItem>
                                        <SelectItem value="high-school">High School</SelectItem>
                                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                        <SelectItem value="graduate">Graduate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Words</label>
                                <div className="mt-4 px-2">
                                    <Slider
                                        defaultValue={[filters.minWords]}
                                        max={filters.maxWords}
                                        min={0}
                                        step={1}
                                        className="mb-6"
                                        onValueChange={(value) => setFilters((prev) => ({ ...prev, minWords: value[0] }))}
                                    />
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <div className="w-1/2">
                                        <Input
                                            type="number"
                                            placeholder="From"
                                            className="w-full"
                                            value={filters.minWords}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, minWords: Number(e.target.value) }))}
                                        />
                                        <span className="text-xs text-gray-500 mt-1">From {filters.minWords}</span>
                                    </div>
                                    <div className="w-1/2">
                                        <Input
                                            type="number"
                                            placeholder="To"
                                            className="w-full"
                                            value={filters.maxWords}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, maxWords: Number(e.target.value) }))}
                                        />
                                        <span className="text-xs text-gray-500 mt-1">To {filters.maxWords}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">1 Page ≈ 275 Words</p>
                            </div>

                            <Button className="w-full rounded-full h-12 bg-[#A414D5] hover:bg-fuchsia-600 text-white" onClick={handleApplyFilters}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <span className="sr-only">Loading...</span>
        </div>}>
            <HomePage />
        </Suspense>
    );
}
