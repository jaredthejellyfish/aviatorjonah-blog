import React, { useState } from 'react'

import type { Articles } from '@/lib/supabase'

type Props = {
  articles: NonNullable<Articles>
}

const ARTICLES_PER_PAGE = 6

function ArticlesSection({ articles }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const currentArticles = articles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end of page range around current page
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust range if current page is near the start or end
      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if there's a gap after first page
      if (start > 2) {
        pageNumbers.push('...')
      }

      // Add page numbers in the range
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if there's a gap before last page
      if (end < totalPages - 1) {
        pageNumbers.push('...')
      }

      // Always show last page
      if (totalPages !== 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {currentArticles?.map((article) => (
          <a
            href={`/article/${article.slug}`}
            className="flex flex-col"
            key={article.id}
          >
            <img
              src={article.image}
              alt={article.title}
              className="mb-3 h-[260px] w-[500px] flex-none rounded-lg bg-gradient-to-tr from-neutral-500/50 to-transparent object-cover"
              width="500"
              height="260"
              loading="lazy"
              decoding="async"
            />
            <span className="text-sm text-black/70 dark:text-white/70">
              {new Date(article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              - {article.read_time} min read
            </span>
            <span className="my-2 text-xl font-medium truncate">
              {article.title}
            </span>
            <p className="text-sm text-black/70 dark:text-white/70">
              {article.excerpt}
            </p>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 text-gray-800 dark:text-white p-4 transition-colors duration-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {getPageNumbers().map((pageNum, index) =>
              typeof pageNum === 'number' ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-lg rounded transition-colors ${
                    currentPage === pageNum
                      ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {pageNum}
                </button>
              ) : (
                <span key={index} className="text-lg">
                  {pageNum}
                </span>
              ),
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default ArticlesSection
