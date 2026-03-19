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
    <div>
      <h1 className="text-center text-xl font-bold mt-10 mb-5">
        Trending Movies
      </h1>

      <div className="flex flex-wrap justify-around">
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