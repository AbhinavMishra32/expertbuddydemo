"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Search } from "lucide-react"
import { getFilteredDocuments } from "@/actions/getFilteredDocs"

// Mock server action for demo purposes
// async function getFilteredDocuments(filters: any) {
//   // This would be replaced with your actual server action
//   await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

//   const mockDocs = Array(16)
//     .fill(null)
//     .map((_, i) => ({
//       id: i + 1,
//       title: "Lorem ipsum dolor sit amet consectetur.",
//       textContent:
//         "Lorem ipsum dolor sit amet consectetur. Morbi integer tempus odio ut fusce pulvinar. Purus in eget vitae posuere laoreet nam. Maecenas tincidunt aliquet pretium eu ornare. At ultricies porttitor mauris sem. Mauris leo venenatis.",
//       subject: "Accounting",
//       category: i % 3 === 0 ? "Essay" : i % 3 === 1 ? "Research Paper" : "Case Study",
//       language: "English",
//       tags: ["Finance", "Analysis"],
//       wordCount: 514,
//       pageCount: 2,
//     }))

//   const startIndex = (filters.page - 1) * filters.pageSize
//   const endIndex = startIndex + filters.pageSize
//   const filteredDocs = mockDocs.filter((doc) => {
//     if (
//       filters.searchQuery &&
//       !doc.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
//       !doc.textContent.toLowerCase().includes(filters.searchQuery.toLowerCase())
//     ) {
//       return false
//     }
//     if (filters.subject && doc.subject !== filters.subject) {
//       return false
//     }
//     if (filters.category && doc.category !== filters.category) {
//       return false
//     }
//     if (doc.wordCount < filters.minWords || doc.wordCount > filters.maxWords) {
//       return false
//     }
//     return true
//   })

//   return {
//     docs: filteredDocs.slice(startIndex, endIndex),
//     totalPages: Math.ceil(filteredDocs.length / filters.pageSize),
//     totalDocs: filteredDocs.length,
//   }
// }

export default function Home() {
  const [docs, setDocs] = useState<any[]>([])
  const [filters, setFilters] = useState({
    searchQuery: "",
    subject: "",
    category: "",
    minWords: 0,
    maxWords: 550000,
    page: 1,
    pageSize: 8,
  })

  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchDocs = async () => {
      setIsSearching(true)
      const { docs, totalPages } = await getFilteredDocuments(filters)
      setDocs(docs)
      setTotalPages(totalPages)
      setTotalDocs(totalDocs)
      setIsSearching(false)
    }

    fetchDocs()
  }, [filters])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setFilters((prev) => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, page: 1 }))
    setCurrentPage(1)
  }

  const handleApplyFilters = () => {
    setFilters((prev) => ({ ...prev, page: 1 }))
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
    {
            <Header handleSearch={handleSearch} filters={filters} setFilters={setFilters} />
    }

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8 gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
                  fill="white"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
                {filters.searchQuery ? `Search results for "${filters.searchQuery}"` : "Find Writing Inspiration in Our Data Base"}
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
                    {docs.map((doc) => (
                      <div key={doc.id} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-5">{doc.textContent}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <FileText className="w-4 h-4" />
                            <span className="text-xs">Words: {doc.wordCount}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <FileText className="w-4 h-4" />
                            <span className="text-xs">Pages: {String(doc.pageCount).padStart(2, "0")}</span>
                          </div>
                        </div>
                      </div>
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
                              className={`h-8 w-8 rounded-md ${
                                currentPage === pageNumber ? "bg-purple-600 text-white" : ""
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
                <Select defaultValue="all">
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
                <Select defaultValue="accounting">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Accounting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
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


const Header: React.FC<{
  handleSearch: (e: React.FormEvent) => void;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}> = ({ handleSearch, filters, setFilters }) => {
    return (
    <header className="bg-purple-600 text-white">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full p-2">
          </div>
          <span className="text-xl font-bold">BUDDY</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-white hover:text-purple-200">
            Find Tutor
          </Link>
          <Link href="#" className="text-white hover:text-purple-200">
            Become Tutor
          </Link>
          <Link href="#" className="text-white hover:text-purple-200">
            Sign In
          </Link>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
            Get Started For Free
          </Button>
        </nav>
      </div>

      <div className="mt-16 mb-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Accounting Homework Samples & Study Documents</h1>
        <p className="text-xl mb-8">Get Access To Our Online Database Of Accounting Writing Samples.</p>
        <form onSubmit={handleSearch} className="relative">
          <div className="flex">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Find any type of work, topic, etc."
                className="w-full pl-12 pr-4 py-6 rounded-l-full bg-white text-black"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white rounded-r-full px-8">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  </header>
    )
}