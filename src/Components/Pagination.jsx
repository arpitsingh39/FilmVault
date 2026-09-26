import React from 'react'

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm flex justify-center gap-4 sm:gap-6 md:gap-8 items-center rounded-lg mx-2 sm:mx-4 md:mx-8 mb-4">
      <button
        onClick={handlePrev}
        className="cursor-pointer text-base sm:text-lg md:text-xl text-white bg-gray-700 hover:bg-blue-600 
                   w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                   transition-colors duration-200 border-0"
      >
        ←
      </button>

      <div className="font-bold text-white text-base sm:text-lg md:text-xl bg-blue-600 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg min-w-[40px] text-center">
        {pageNo}
      </div>

      <button
        onClick={handleNext}
        className="cursor-pointer text-base sm:text-lg md:text-xl text-white bg-gray-700 hover:bg-blue-600 
                   w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                   transition-colors duration-200 border-0"
      >
        →
      </button>
    </div>
  )
}

export default Pagination
