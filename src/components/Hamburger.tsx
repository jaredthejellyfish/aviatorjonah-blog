import React, { useState } from 'react'

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="relative h-10 w-10 focus:outline-none lg:hidden mr-3"
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            className={`absolute h-0.5 w-6 transform transition duration-300 ease-in-out bg-white ${
              isOpen ? 'rotate-45 delay-200' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 transform transition-all duration-200 ease-in-out bg-white ${
              isOpen ? 'w-0 opacity-50' : 'w-6 opacity-100 delay-200'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 transform transition duration-300 ease-in-out bg-white ${
              isOpen ? '-rotate-45 delay-200' : 'translate-y-2'
            }`}
          ></span>
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 dark:bg-white bg-black text-white dark:text-black rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li>
              <a href="/" className="block px-4 py-2 hover:bg-neutral-900 dark:hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block px-4 py-2 hover:bg-neutral-900 dark:hover:bg-gray-100">
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="block px-4 py-2 hover:bg-neutral-900 dark:hover:bg-gray-100"
              >
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="block px-4 py-2 hover:bg-neutral-900 dark:hover:bg-gray-100">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Hamburger
