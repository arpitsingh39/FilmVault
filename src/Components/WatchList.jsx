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
    localStorage.setItem("watchList", JSON.stringify(sorted));
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

  return (
    <div>
      {/* All Genre Buttons */}
      <div className="flex justify-center gap-4 m-4 flex-wrap">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedGenre === genre
                ? "bg-blue-500"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Searching the WatchList */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search your watchlist..."
          className="bg-gray-200 p-2 rounded m-2 w-72"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Displaying the WatchList in a Table with options to sort and delete */}
      <div className="overflow-hidden mx-4 rounded-lg border border-gray-200 m-8">
        <table className="w-full border-collapse text-black">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>

              <th className="px-4 py-2">
                <div className="flex items-center justify-center gap-2">
                  <span>Ratings</span>
                  <div className="flex flex-col">
                    <FaArrowUp
                      onClick={sortIncreasing}
                      className="text-xs cursor-pointer hover:text-blue-500"
                    />
                    <FaArrowDown
                      onClick={sortDecreasing}
                      className="text-xs cursor-pointer hover:text-blue-500"
                    />
                  </div>
                </div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {watchList
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
              )
              .map((movie) => (
                <tr key={movie.id} className="text-center border-b">
                  <td className="flex items-center p-2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="Poster"
                      className="w-16 mr-4"
                    />
                    {movie.title}
                  </td>

                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>

                  <td>
                    {movie.genre_ids
                      .map((id) => genreMap[id])
                      .join(", ")}
                  </td>

                  {/* ❌ DELETE BUTTON */}
                  <td
                    onClick={() => handleDelete(movie.id)}
                    className="text-red-600 cursor-pointer font-bold hover:underline"
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