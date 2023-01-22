import {useRef, useEffect} from 'react'
import useGame from '../hooks/useGame'
import Grid from './Grid'

export default function UI({bird}: { bird: string})  {

   const { countTurns, pastGuesses, userInput, handleChange} = useGame({bird})
    
//This is effectively a keylogger
   useEffect(() => {
    window.addEventListener('keydown', handleChange)

    return() => window.removeEventListener('keydown', handleChange)
   }, [handleChange])
    
    
    return (
        <div>
            <Grid countTurns={countTurns} userInput={userInput} pastGuesses={pastGuesses} handleChange={handleChange} />
        </div>


    )

}