import {useRef, useEffect} from 'react'
import useGame from '../hooks/useGame'
import Grid from './Grid'

export default function UI({bird}: { bird: string})  {

   const { countTurns, pastGuesses, userInput, handleChange, handleSubmit} = useGame({bird})
    
//This is effectively a keylogger
   useEffect(() => {
    window.addEventListener('keydown', handleChange)
    return() => window.removeEventListener('keydown', handleChange)
   }, [handleChange])
//This checks if you pressed the enter key to run the game logic
//    useEffect(() => {
//     window.addEventListener('keyup', handleSubmit)
//     return() => window.removeEventListener('keyup', handleSubmit)
//    }, [handleSubmit])
    
    
    return (
        <div>
            <Grid countTurns={countTurns} userInput={userInput} pastGuesses={pastGuesses} handleChange={handleChange} />
        </div>


    )

}