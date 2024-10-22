import { Circle, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { Articles } from '@/lib/supabase'

import ThemeToggle from './ReactThemeToggle'
import Hamburger from './Hamburger'

type Props = {
  topThreeArticles: NonNullable<Articles>
}

function HeroSection({ topThreeArticles }: Props) {
  const [currentArticle, setCurrentArticle] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentArticle((prev) => (prev + 1) % topThreeArticles.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 5000)
    return () => clearInterval(interval)
  }, [topThreeArticles.length])

  const handleCircleClick = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentArticle(index)
      setIsTransitioning(false)
    }, 500) // Half of the transition duration
  }

  return (
    <div className="w-fullrelative flex h-screen items-center justify-center p-2">
      <div
        className="absolute left-2 right-2 top-2 h-1/3 rounded-lg bg-gradient-to-b from-black/50 to-transparent"
      >
        <div
          className="mt-1 flex h-20 w-full items-center justify-between px-0 pr-4 text-white sm:mt-4 sm:px-10"
        >
          <a href="/" className="flex items-center gap-6 lg:w-1/3">
            <img
              src="/logo.png"
              alt="logo"
              className="h-14 w-40 scale-75 object-cover sm:scale-100"
            />
          </a>

          <div className="hidden w-1/3 items-center justify-center gap-6 lg:flex">
            <span className="text-lg font-bold text-white"> Home </span>
            <span className="text-lg font-bold text-white"> About </span>
            <span className="text-lg font-bold text-white"> About </span>
            <span className="text-lg font-bold text-white"> About </span>
          </div>

          <div className="relative flex items-center justify-end lg:w-1/3">
            <ThemeToggle />
            <div
              className="ml-3 hidden max-w-[350px] flex-1 items-center justify-between gap-2 rounded-lg bg-white/10 p-2 px-4 text-white sm:flex"
            >
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none"
              />
              <Search className="h-5 w-5" />
            </div>
            <Hamburger  />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex h-1/3 items-end rounded-lg bg-gradient-to-t from-black/30 to-transparent justify-between">
        <div className="flex flex-col gap-4 p-4 text-white sm:p-10">
          <div className="relative -ml-1.5 flex max-w-[140px] items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-neutral-700/80 backdrop-blur-md"
              aria-hidden="true"
            ></div>
            <div className="relative inline-block rounded-full px-4 py-1 text-sm font-medium text-white">
              <span className="text-lg">Destination</span>
            </div>
          </div>
          <span className="text-5xl font-bold"> Article of the week </span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            voluptatum recusandae amet dolorem consequuntur tenetur, provident
            vitae quaerat harum, reiciendis repellat. Quos, dolores eum. Sint,
            accusantium eos! Omnis, suscipit provident.
          </span>
          <div className="mt-2 flex items-center gap-2">
            <Circle className="h-4 w-4" />
            <Circle className="h-4 w-4" />
            <Circle className="h-4 w-4" />
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
            <span className="font-extralight">24th of October 2024</span>
            <Circle className="h-2 w-2 fill-white" />
            <span className="font-extralight">10 min read</span>
          </div>
        </div>
      </div>
      <img
        src="/plane.jpg"
        alt="logo"
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  )
}

export default HeroSection
