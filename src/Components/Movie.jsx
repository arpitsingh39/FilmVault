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
      className="relative h-[40vh] w-[150px] bg-cover bg-center rounded-xl 
                 hover:cursor-pointer hover:scale-110 duration-300 
                 m-5 flex items-end text-white p-2 bg-black/40"
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
        className="absolute top-2 right-2 bg-gray-900/60 px-2 rounded-lg cursor-pointer"
      >
        {isInWatchList ? '❌' : '😍'}
      </div>

      <h1 className="w-full text-center font-semibold bg-gray-900/60 rounded">
        {name}
      </h1>
    </div>
  )
}

export default Movie
