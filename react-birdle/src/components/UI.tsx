import {useEffect} from 'react'
import useGame from '../hooks/useGame'


export default function UI({bird}: { bird: string})  {

   const { userInput, handleChange} = useGame({bird})
    

   useEffect(() => {
    window.addEventListener('keypress', handleChange)

    return() => window.removeEventListener('keypress', handleChange)
   }, [handleChange])
    
    
    return (

 <></>


    )

}