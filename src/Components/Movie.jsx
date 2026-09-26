import React from 'react'

function Movie({
  movieObj,
  poster_path,
  name,
  watchList,
  handleAddtoWatchList,
  handleRemoveFromWatchList
}) {

  // ✅ Check if movie exists in watchlist
  const isInWatchList = watchList.some(
    movie => movie.id === movieObj.id
  )

  return (
    <div
      className="relative h-[28vh] w-[110px] sm:h-[35vh] sm:w-[130px] md:h-[40vh] md:w-[160px] lg:h-[45vh] lg:w-[180px]
                 bg-cover bg-center rounded-xl 
                 hover:cursor-pointer hover:scale-105 duration-300 
                 m-2 sm:m-3 md:m-4 flex items-end text-white p-1.5 sm:p-2
                 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`,
      }}
    >
      {/* Toggle Add / Remove */}
      <div
        onClick={() =>
          isInWatchList
            ? handleRemoveFromWatchList(movieObj)
            : handleAddtoWatchList(movieObj)
        }
        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-gray-900/60 px-1.5 sm:px-2 py-0.5 rounded-lg cursor-pointer
                   text-sm sm:text-base hover:bg-gray-900/90 transition-colors duration-200"
      >
        {isInWatchList ? '❌' : '😍'}
      </div>

      <h1 className="w-full text-center text-xs sm:text-sm md:text-base font-semibold bg-gray-900/60 rounded py-0.5 sm:py-1 line-clamp-1">
        {name}
      </h1>
    </div>
  )
}

export default Movie
