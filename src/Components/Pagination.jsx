import React from 'react'

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="mt-8 p-4 bg-gray-400 flex justify-center gap-8 items-center">
      <div onClick={handlePrev} className="cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      <div className="font-bold">{pageNo}</div>

      <div onClick={handleNext} className="cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  )
}

export default Pagination
