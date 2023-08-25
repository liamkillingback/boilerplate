import React, { useState } from 'react'
import { landing } from '../assets'

const Landing = () => {
  const [Landing, setLanding] = useState(true)
  return (
    <div className={`landing w-screen h-screen absolute bg-gray-500 top-0 ${Landing ? "translate-y-0" : "-translate-y-full"} duration-500 transition-all ease-out`}>
      <div>
      
      <button onClick={() => setLanding(!Landing)}>Fade up bois</button>

      </div>
    </div>
  )
}

export default Landing