import React, { useState } from 'react'
import movieLogo from "../Assets/movieLogo.jpg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <header>
        <nav className="relative flex items-center justify-between px-3 sm:px-6 h-[60px] sm:h-[70px] text-blue-500 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={movieLogo} alt="Movie Logo" className="w-[36px] h-[36px] sm:w-[45px] sm:h-[45px] rounded-lg" />
            <span className="text-lg sm:text-xl font-bold text-white hidden sm:inline">FilmVault</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-6 md:gap-8">
            <Link
              to="/"
              className="text-base md:text-lg font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Movies
            </Link>
            <Link
              to="/watchlist"
              className="text-base md:text-lg font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              WatchList
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`sm:hidden absolute left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col py-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 text-gray-300 hover:text-blue-400 hover:bg-white/5 font-semibold transition-colors duration-200"
            >
              Movies
            </Link>
            <Link
              to="/watchlist"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-3 text-gray-300 hover:text-blue-400 hover:bg-white/5 font-semibold transition-colors duration-200"
            >
              WatchList
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar