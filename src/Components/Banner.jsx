import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'

function Banner() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Touch/drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const bannerRef = useRef(null)
  const autoPlayRef = useRef(null)

  // Fetch trending movies
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      .then((res) => {
        // Take top 8 trending movies
        setTrendingMovies(res.data.results.slice(0, 8))
      })
      .catch((err) => console.error('Failed to fetch trending movies:', err))
  }, [])

  // Auto-play
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      goToNext()
    }, 5000)
  }, [trendingMovies.length])

  useEffect(() => {
    if (trendingMovies.length > 0) {
      startAutoPlay()
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [trendingMovies, startAutoPlay])

  const goToNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) =>
      prev === trendingMovies.length - 1 ? 0 : prev + 1
    )
  }

  const goToPrev = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) =>
      prev === 0 ? trendingMovies.length - 1 : prev - 1
    )
  }

  const goToSlide = (index) => {
    setIsTransitioning(true)
    setCurrentIndex(index)
    startAutoPlay()
  }

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setTranslateX(0)
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    setTranslateX(currentX - startX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 50

    if (translateX < -threshold) {
      goToNext()
    } else if (translateX > threshold) {
      goToPrev()
    }
    setTranslateX(0)
    startAutoPlay()
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setTranslateX(0)
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const currentX = e.clientX
    setTranslateX(currentX - startX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 50

    if (translateX < -threshold) {
      goToNext()
    } else if (translateX > threshold) {
      goToPrev()
    }
    setTranslateX(0)
    startAutoPlay()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  if (trendingMovies.length === 0) {
    return (
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] bg-gray-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const movie = trendingMovies[currentIndex]
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <div
      ref={bannerRef}
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-center bg-cover bg-no-repeat ${
          isTransitioning ? 'animate-banner-fade' : ''
        }`}
        style={{
          backgroundImage: `url(${backdropUrl})`,
          transform: isDragging ? `translateX(${translateX}px)` : 'translateX(0)',
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
        onAnimationEnd={() => setIsTransitioning(false)}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Left Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goToPrev()
          startAutoPlay()
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                   bg-black/40 hover:bg-black/70 backdrop-blur-sm
                   rounded-full flex items-center justify-center
                   text-white text-lg sm:text-xl md:text-2xl
                   transition-all duration-300 opacity-0 hover:opacity-100
                   group-hover:opacity-100 cursor-pointer
                   border border-white/20 hover:border-white/50"
        style={{ opacity: undefined }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goToNext()
          startAutoPlay()
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                   bg-black/40 hover:bg-black/70 backdrop-blur-sm
                   rounded-full flex items-center justify-center
                   text-white text-lg sm:text-xl md:text-2xl
                   transition-all duration-300 cursor-pointer
                   border border-white/20 hover:border-white/50"
        style={{ opacity: 0.6 }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
      >
        ›
      </button>

      {/* Movie Info at Bottom */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-4 sm:left-8 md:left-12 right-4 sm:right-8 z-10">
        <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
          {movie.title || movie.name}
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-full sm:max-w-[80%] md:max-w-[60%] line-clamp-2 sm:line-clamp-3 drop-shadow-md leading-relaxed">
          {movie.overview}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
          <span className="bg-yellow-500/90 text-black text-xs sm:text-sm font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-gray-400 text-xs sm:text-sm">
            {movie.release_date?.split('-')[0]}
          </span>
          <span className="text-blue-400 text-xs sm:text-sm font-medium px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-500/20 rounded-full">
            🔥 Trending
          </span>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              goToSlide(index)
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer border-0 outline-none ${
              index === currentIndex
                ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-white'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/10 z-10">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / trendingMovies.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

export default Banner