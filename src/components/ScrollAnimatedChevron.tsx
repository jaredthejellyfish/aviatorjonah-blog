import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

// Adjust the import based on your file structure

const ScrollAnimatedChevron = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down
      if (window.scrollY > 0) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
      <ChevronDown
        onClick={scrollDown}
        className={cn(
          'transform transition-all duration-300 text-white/70 opacity-40 cursor-pointer',
          isScrolledDown
            ? 'rotate-180 opacity-100 text-white/70 h-10 w-10'
            : 'h-8 w-8',
        )}
      />
    </div>
  )
}

export default ScrollAnimatedChevron
