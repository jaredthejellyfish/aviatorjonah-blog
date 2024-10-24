import { Circle } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { Articles, ServerUser } from '@/lib/supabase'

import Hamburger from './Hamburger'
import ThemeToggle from './ReactThemeToggle'
import ScrollAnimatedChevron from './ScrollAnimatedChevron'
import SearchWithResults from './Search'
import User from './User'
import { Button } from './ui/button'

type Props = {
  topThreeArticles: NonNullable<Articles>
  isLoggedIn: boolean
  user: ServerUser | null
}

function HeroSection({ topThreeArticles, isLoggedIn, user }: Props) {
  const [currentArticle, setCurrentArticle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % topThreeArticles.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [topThreeArticles.length])

  const handleCircleClick = (index: number) => {
    setCurrentArticle(index)
  }

  return (
    <div className="w-full relative flex h-screen items-center justify-center p-2">
      <div className="absolute left-2 right-2 top-2 h-1/3 rounded-lg bg-gradient-to-b from-black/50 to-transparent">
        <div className="mt-1 flex h-20 w-full items-center justify-between px-0 pr-4 text-white sm:mt-4 sm:px-10">
          <div className="flex flex-row items-center justify-start gap-x-10">
            <a href="/" className="flex items-center gap-6">
              <img
                src="/logo.png"
                alt="logo"
                className="h-14 w-40 scale-75 object-cover sm:scale-100"
              />
            </a>

            <div className="hidden items-center justify-center gap-6 lg:flex">
              <span className="text-lg font-bold text-white"> Home </span>
              <span className="text-lg font-bold text-white"> About </span>
              <span className="text-lg font-bold text-white"> About </span>
              <span className="text-lg font-bold text-white"> About </span>
            </div>
          </div>

          <div className="relative flex items-center justify-end lg:w-1/3">
            <ThemeToggle />
            <SearchWithResults />
            <a href={isLoggedIn ? '/account' : '/auth/signin'}>
              {isLoggedIn ? (
                <User user={user} />
              ) : (
                <Button
                  variant="outline"
                  className="h-10 ml-3 bg-white text-black border-transparent hover:bg-white/80 hover:text-black"
                >
                  Sign in
                </Button>
              )}
            </a>
            <Hamburger />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex h-1/3 items-end rounded-lg bg-gradient-to-t from-black/30 to-transparent justify-between">
        <div className="flex flex-col gap-4 p-4 text-white sm:p-10 w-full">
          <div className="relative -ml-1.5 flex max-w-[140px] items-center justify-center">
            <div className="relative inline-block rounded-full px-4 py-1 text-sm font-medium text-white">
              <span className="text-lg">Destination</span>
            </div>
          </div>
          <span className="text-5xl font-bold">
            {topThreeArticles[currentArticle]?.title}
          </span>
          <span>{topThreeArticles[currentArticle]?.excerpt}</span>
          <div className="mt-2 flex items-center gap-2">
            {topThreeArticles.map((_, index) => (
              <Circle
                key={index}
                className={`h-4 w-4 cursor-pointer ${
                  index === currentArticle ? 'fill-white' : 'fill-white/50'
                }`}
                onClick={() => handleCircleClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="hidden h-full flex-col items-end justify-center gap-2 text-white sm:p-10 md:flex w-full">
          <div className="mt-4 flex items-center gap-2">
            <img
              src="/human.jpg"
              alt="logo"
              className="h-14 w-14 rounded-full border-2 border-white/50 object-contain"
            />
            <span className="ml-3 text-xl font-bold">Barack Obama</span>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <span className="font-extralight">
              {new Date(
                topThreeArticles[currentArticle]?.created_at ?? '',
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <Circle className="h-2 w-2 fill-white" />
            <span className="font-extralight">
              {topThreeArticles[currentArticle]?.read_time} min read
            </span>
          </div>
        </div>
      </div>
      <ScrollAnimatedChevron />
      <img
        src={topThreeArticles[currentArticle]?.image}
        alt={topThreeArticles[currentArticle]?.title}
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  )
}

export default HeroSection
