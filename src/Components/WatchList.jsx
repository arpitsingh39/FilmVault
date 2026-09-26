import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import genreMap from "../utility/genre";

function WatchList({ watchList, setWatchList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  // 🔍 Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 🔼 Sort rating in ascending order
  const sortIncreasing = () => {
    const sorted = [...watchList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sorted);
    localStorage.setItem("watchList", JSON.stringify(sorted));//sorting correction
  };

  // 🔽 Sort rating in descending order
  const sortDecreasing = () => {
    const sorted = [...watchList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sorted);
    localStorage.setItem("watchList", JSON.stringify(sorted));
  };

  // ❌ DELETE MOVIE
  const handleDelete = (movieId) => {
    const updatedList = watchList.filter(
      (movie) => movie.id !== movieId
    );

    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  // Get all the genres
  useEffect(() => {
    const genres = new Set();

    watchList.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        if (genreMap[id]) genres.add(genreMap[id]);
      });
    });

    setGenreList(["All Genres", ...genres]);
  }, [watchList]);

  // Filtered movies
  const filteredMovies = watchList
    .filter((movie) =>
      movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((movie) =>
      selectedGenre === "All Genres"
        ? true
        : movie.genre_ids.some(
            (id) => genreMap[id] === selectedGenre
          )
    );

  return (
    <div className="px-2 sm:px-4 md:px-8 pb-8">
      {/* All Genre Buttons */}
      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 m-3 sm:m-4 flex-wrap">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white text-xs sm:text-sm md:text-base
                        transition-all duration-200 border-0 cursor-pointer ${
              selectedGenre === genre
                ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Searching the WatchList */}
      <div className="flex justify-center my-3 sm:my-4">
        <input
          type="text"
          placeholder="Search your watchlist..."
          className="bg-gray-800 text-white p-2 sm:p-2.5 rounded-lg w-[90%] sm:w-72 md:w-80 
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     placeholder:text-gray-500 text-sm sm:text-base transition-colors duration-200"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Sort Buttons (visible on mobile) */}
      <div className="flex justify-center gap-3 mb-4 md:hidden">
        <button
          onClick={sortIncreasing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-white rounded-lg text-xs border-0 cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <FaArrowUp className="text-xs" /> Rating ↑
        </button>
        <button
          onClick={sortDecreasing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-white rounded-lg text-xs border-0 cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <FaArrowDown className="text-xs" /> Rating ↓
        </button>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-3">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800/60 rounded-xl p-3 flex gap-3 items-start border border-gray-700/50"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Poster"
              className="w-16 sm:w-20 rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 text-xs sm:text-sm font-bold">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-400 text-xs">
                  Pop: {Math.round(movie.popularity)}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {movie.genre_ids
                  .map((id) => genreMap[id])
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <button
                onClick={() => handleDelete(movie.id)}
                className="mt-2 text-red-400 hover:text-red-300 text-xs font-semibold cursor-pointer bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded border-0 transition-colors duration-200"
              >
                🗑 Remove
              </button>
            </div>
          </div>
        ))}
        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500 py-8 text-sm">No movies in your watchlist</p>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-hidden mx-4 rounded-lg border border-gray-700/50 m-8">
        <table className="w-full border-collapse text-white">
          <thead className="border-b-2 border-gray-700 bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>

              <th className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <span>Ratings</span>
                  <div className="flex flex-col">
                    <FaArrowUp
                      onClick={sortIncreasing}
                      className="text-xs cursor-pointer hover:text-blue-400 transition-colors"
                    />
                    <FaArrowDown
                      onClick={sortDecreasing}
                      className="text-xs cursor-pointer hover:text-blue-400 transition-colors"
                    />
                  </div>
                </div>
              </th>

              <th className="px-4 py-3">Popularity</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="text-center border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                <td className="flex items-center p-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Poster"
                    className="w-14 lg:w-16 mr-3 lg:mr-4 rounded-lg"
                  />
                  <span className="text-sm lg:text-base">{movie.title}</span>
                </td>

                <td className="text-sm lg:text-base">{movie.vote_average}</td>
                <td className="text-sm lg:text-base">{movie.popularity}</td>

                <td className="text-sm lg:text-base">
                  {movie.genre_ids
                    .map((id) => genreMap[id])
                    .join(", ")}
                </td>

                {/* ❌ DELETE BUTTON */}
                <td
                  onClick={() => handleDelete(movie.id)}
                  className="text-red-400 cursor-pointer font-bold hover:text-red-300 hover:underline text-sm lg:text-base transition-colors"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
