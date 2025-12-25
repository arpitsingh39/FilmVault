import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import WatchList from "./Components/WatchList.jsx";
import Movies from "./Components/Movies.jsx";
import { Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner.jsx";
import Pagination from "./Components/Pagination.jsx";

function App() {
  const [pageNo, setPageNo] = useState(1);
  const [watchList, setWatchList] = useState([]);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const storedWatchList = localStorage.getItem("watchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleAddtoWatchList = (movieObj) => {
    const newWatchList = [...watchList, movieObj];
    setWatchList(newWatchList);
    localStorage.setItem("watchList", JSON.stringify(newWatchList));
  };

  const hanleRemoveFromWatchList = (movieObj) => {
    const updatedList = watchList.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                pageNo={pageNo}
                watchList={watchList}
                handleAddtoWatchList={handleAddtoWatchList}
                handleRemoveFromWatchList={hanleRemoveFromWatchList}
              />
              <Pagination
                handlePrev={handlePrev}
                handleNext={handleNext}
                pageNo={pageNo}
              />
            </>
          }
        />
        <Route
          path="/WatchList"
          element={<WatchList watchList={watchList} setWatchList={setWatchList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
