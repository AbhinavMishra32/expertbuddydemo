'use client';

import { useEffect, useState } from 'react';
import { getFilteredDocuments } from '@/actions/getFilteredDocs'; // your server action

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    subject: '',
    category: '',
    minWords: 0,
    maxWords: 1000000,
    page: 1,
    pageSize: 1,
  });

  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      setIsSearching(true);
      const { docs, totalPages } = await getFilteredDocuments(filters);
      setDocs(docs);
      setTotalPages(totalPages);
      setIsSearching(false);
    };

    fetchDocs();
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search by title or content"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        value={filters.searchQuery}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            searchQuery: e.target.value,
            page: 1,
          }))
        }
      />

      {isSearching ? (
        <div className="text-center py-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 mt-2">Searching documents...</p>
        </div>
      ) : (
        <>
          {docs.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">No documents found.</p>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-4"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{doc.textContent}</p>

                <div className="flex flex-wrap gap-2 text-sm mt-3">
                  {doc.subject && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {doc.subject}
                    </span>
                  )}
                  {doc.category && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {doc.category}
                    </span>
                  )}
                  {doc.language && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {doc.language}
                    </span>
                  )}
                  {doc.tags &&
                    doc.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            ))
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded ${
                    filters.page === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}