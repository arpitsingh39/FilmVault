import React from 'react'
import movieLogo from "../Assets/movieLogo.jpg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <header>
            <div className = "flex pl-2 items-center gap-8 h-[70px]  text-blue-500">
                <img src={movieLogo} alt="Movie Logo" class="w-[50px] h-[50px]" />
                <Link to="/" className="text-3xl font-bold">Movies</Link>
                <Link to="/watchlist" className="text-3xl font-bold">WatchList</Link>
            </div>
        </header>
    </div>
  )
}

export default Navbar