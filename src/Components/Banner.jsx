import React from 'react'
import strangerthings from '../Assets/strangerthings.png'

function Banner() {
  return (
   <div
  className="w-full h-[90vh] md:h-[90vh]  bg-center  bg-cover bg-no-repeat flex items-end justify-center "
  style={{ backgroundImage: `url(${strangerthings})` }}
>
  <div className="text-red-600 text-xl bg-black/40 w-full text-center">
    Stranger Things
  </div>
</div>


  )
}

export default Banner