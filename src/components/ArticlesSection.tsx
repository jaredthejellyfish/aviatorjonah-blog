import { ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import type { Articles } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type Props = {
  articles: NonNullable<Articles>
}

const ARTICLES_PER_PAGE = 9
const SORT_OPTIONS = ['Newest', 'Oldest']
const FILTER_OPTIONS = ['All', 'Item 1', 'Item 2', 'Item 3']

function ArticlesSection({ articles }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0])
  const [filterOption, setFilterOption] = useState(FILTER_OPTIONS[0])
  const [filterOptionsOpen, setFilterOptionsOpen] = useState(false)

  // Load page number from localStorage when component mounts
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage')
    const savedSortOption = localStorage.getItem('sortOption')
    const savedFilterOption = localStorage.getItem('filterOption')

    if (savedPage) {
      setCurrentPage(Number(savedPage))
    }

    if (savedSortOption) {
      setSortOption(savedSortOption)
    }

    if (savedFilterOption) {
      setFilterOption(savedFilterOption)
    }
  }, [])

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', String(currentPage))
  }, [currentPage])

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption ?? SORT_OPTIONS[0]!)
  }, [sortOption])

  useEffect(() => {
    localStorage.setItem('filterOption', filterOption ?? FILTER_OPTIONS[0]!)
  }, [filterOption])

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      if (sortOption === 'Oldest') {
        return dateA - dateB // Ascending order
      } else {
        return dateB - dateA // Descending order (default)
      }
    })
  }, [articles, sortOption])

  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const currentArticles = sortedArticles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      if (start > 2) {
        pageNumbers.push('...')
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push('...')
      }

      if (totalPages !== 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              className={cn(
                'rounded-lg px-3 py-1 text-base sm:px-4 sm:py-2 bg-transparent hover:bg-black/10 hover:dark:bg-white/10 transition-colors',
                option === 'All' &&
                  'border border-neutral-300 dark:border-neutral-600',
                filterOption === option && 'bg-black/10 dark:bg-white/10',
              )}
              onClick={() => setFilterOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="relative flex items-center gap-2 sm:gap-3">
          <span className="text-sm sm:text-base">Sort by:</span>
          <button
            className="flex items-center justify-center gap-x-1 rounded-lg border border-neutral-300 px-2 py-1 text-sm font-medium dark:border-neutral-600 sm:gap-x-2 sm:px-4 sm:py-2 sm:text-base hover:bg-black/10 transition-all"
            onClick={() => setFilterOptionsOpen(!filterOptionsOpen)}
          >
            <span>{sortOption}</span>

            <ChevronDown
              className={cn(
                'h-3 w-3 transition-transform sm:h-4 sm:w-4',
                filterOptionsOpen && 'rotate-180',
              )}
            />
          </button>

          <div
            className={cn(
              'absolute right-0 top-12 w-32 rounded-lg border p-2 transition-all z-50 dark:bg-black bg-white flex flex-col gap-y-1',
              !filterOptionsOpen && 'opacity-0 pointer-events-none',
            )}
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setSortOption(option)}
                className={cn(
                  'w-full rounded-lg px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  option === sortOption && 'bg-black/10 dark:bg-white/10',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {currentArticles?.map((article) => (
          <a
            href={`/article/${article.slug}`}
            className="flex flex-col"
            key={article.id}
            style={{ viewTransitionName: `article-image-${article.id}` }}
            data-astro-prefetch="viewport"
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
