import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Separator } from '@/components/ui/separator'
import useDataFetching from '@/hooks/useDataFetching'

interface SearchResult {
  id: number
  title: string
  category: string
  slug: string
}

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, error, isLoading, refetch } = useDataFetching<SearchResult[]>(
    `/api/search?query=${searchQuery}`,
    searchQuery.length < 3,
  )

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setIsSearchOpen(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setIsSearchOpen(false)
  }

  useEffect(() => {
    if (searchQuery) {
      refetch()
    }
  }, [searchQuery])

  return (
    <div className="relative ml-3 hidden max-w-[350px] flex-1 items-center justify-between gap-2 rounded-lg bg-white/10 p-2 px-4 text-white sm:flex z-50">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none placeholder:text-white/80"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {!searchQuery ? (
        <Search className="h-5 w-5" />
      ) : (
        <X className="h-5 w-5 cursor-pointer" onClick={clearSearch} />
      )}
      {isSearchOpen && !isLoading && !error && data && (
        <div className="absolute left-0 right-0 top-10 mt-2 rounded-lg border border-black/70 bg-white text-black shadow-md outline-none animate-in fade-in-0 zoom-in-95 dark:border-white/70 dark:bg-black dark:text-white">
          <Command>
            <CommandList>
              {!isLoading && error && (
                <CommandEmpty>Error: {error}</CommandEmpty>
              )}
              {!isLoading && data && data.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              {!isLoading && data && data.length > 0 && (
                <CommandGroup heading="Search Results">
                  {data.map((result) => (
                    <a href={`/article/${result.slug}`} key={result.id}>
                      <CommandItem
                        key={result.id}
                        className="flex cursor-pointer items-center justify-between py-2"
                      >
                        <span className="text-sm font-medium">
                          {result.title}
                        </span>
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-4"
                        />
                        <span className="text-xs font-extralight text-black/70 dark:text-white/70">
                          {result.category}
                        </span>
                      </CommandItem>
                    </a>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}