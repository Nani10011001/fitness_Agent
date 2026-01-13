import React from 'react'
import {Typewriter} from "react-simple-typewriter"
const TypeWriterEffect = ({text}) => {
  return (
    <span>
        <Typewriter
        words={[text]}
        typeSpeed={28}
       
timeoutMultiplier={30}
        deleteSpeed={0}
        delaySpeed={400}
        cursor={false}
        />
    </span>
  )
}

export default TypeWriterEffect
