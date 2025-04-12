"use client"

import type React from "react"

import { useEffect, useState } from "react"
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

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [docs, setDocs] = useState<Document[]>([])
  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("search") || "",
    subject: searchParams.get("subject") || "",
    category: searchParams.get("category") || "",
    minWords: searchParams.get("minWords") ? Number(searchParams.get("minWords")) : 0,
    maxWords: searchParams.get("maxWords") ? Number(searchParams.get("maxWords")) : 550000,
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
    window.scrollTo({ top: 0, behavior: "smooth" })
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
      <header className="relative bg-[#A414D5] text-white pt-6 h-[450px] lg:px-[140px] px-4 pb-10 overflow-hidden">
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
        <div className={`${manrope.className} relative z-10 text-black flex justify-between sm:h-16 h-14 w-full bg-white rounded-full`}>
          <div className="xl:w-full w-[40%] h-full flex items-center px-6">
            <Image src="/logo.png" alt="Logo" width={135} height={60} />
          </div>
          <div className="w-full flex md:justify-between justify-end items-center p-2">
            <p className='md:inline hidden'>Find Tutor</p>
            <p className='md:inline hidden'>Become Tutor</p>
            <p className='md:inline hidden'>Sign In</p>
            <button className="rounded-full sm:text-base text-sm bg-black hover:bg-[#A414D5] text-white h-full px-8">
              Get Started For Free
            </button>
          </div>
        </div>

      <div className={`${DMSans.className} mt-10`}>
        <h1 className='sm:text-5xl text-3xl font-semibold text-white'>Accounting Homework
          <br/>
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

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8 gap-2">
            <svg width="60" height="73" viewBox="0 0 60 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7407 71C14.4618 59.7027 5.77095 47.3316 2.11109 34.5969C0.802087 30.0421 11.4709 38.1774 12.6037 38.9965C13.3478 39.5345 13.4157 39.8494 13.5316 38.2869C13.9471 32.6804 13.2265 26.9705 13.0676 21.3626C12.973 18.023 13.3112 17.1471 16.3153 19.4821C20.7802 22.9524 23.7013 27.7832 27.8785 31.4746C29.65 33.04 29.4793 23.0712 29.5559 22.3915C29.9719 18.7008 30.4908 13.0249 32.8036 9.83139C33.5215 8.84008 39.9673 22.4368 41.9757 20.4401C46.119 16.3209 49.9142 11.6819 53.075 6.78004C53.3143 6.4088 56.6438 -0.606002 56.6438 3.05458C56.6438 12.7352 56.7873 21.7588 58 31.4036" stroke="#A414D5" stroke-width="4" stroke-linecap="round" />
            </svg>
            <h2 className={`${DMSans.className} text-2xl flex justify-center w-full font-bold text-gray-800`}>
              {searchParams.get("search") ? `Search results for "${searchParams.get("search")}"` : "Find Writing Inspiration in Our Data Base"}
            </h2>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docs.map((doc: Document) => (
                      <Link
                      href={`/document/${doc.id}`}>
                      <div key={doc.id} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-5">{doc.textContent}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <FileText className="w-4 h-4" />
                            <span className="text-xs">Words: {doc.WordCount}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <FileText className="w-4 h-4" />
                            <span className="text-xs">Pages: {String(doc.Pages).padStart(2, "0")}</span>
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
            <div className="w-full md:max-w-72 space-y-6 bg-white p-6 rounded-lg h-fit">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of work</label>
                <Select
                  defaultValue={filters.category || "all"}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Project Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Project Types</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="research">Research Paper</SelectItem>
                    <SelectItem value="case">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Select
                  onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={searchParams.get("subject") ? searchParams.get("subject") : "Filter by subject"} defaultValue={searchParams.get("subject") || ""} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Subject).map((subject) => (
                        <SelectItem key={subject} value={subject}>
                            {subject}
                        </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of work</label>
                <Select defaultValue="any">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Academic Level" />
                  </SelectTrigger>
                  <SelectContent>
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
                    max={550000}
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
                <p className="text-xs text-gray-500 mt-4">1 Page ≈ 275 Words</p>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleApplyFilters}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
