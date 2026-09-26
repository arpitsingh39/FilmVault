import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

function Movies({ pageNo, watchList, handleAddtoWatchList, handleRemoveFromWatchList }) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${pageNo}`
      )
      .then(res => setMovies(res.data.results))
  }, [pageNo])

  return (
    <div className="px-2 sm:px-4 md:px-8">
      <h1 className="text-center text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-5 text-white">
        Trending Movies
      </h1>

      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3">
        {movies.map(movieObj => (
          <Movie
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            watchList={watchList}
            handleAddtoWatchList={handleAddtoWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
          />
        ))}
      </div>
    </div>
  )
}
export default Movies