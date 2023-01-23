import { match } from 'assert'
import React, {useState, useRef} from 'react'

const useGame = ({bird}: {bird: string}) => {
    const [userInput, setUserInput] = useState('')
    const [history, setHistory] = useState<Array<string>>([])
    const [firstTurn, setFirstTurn] = useState(true)
    const [usedKeys, setUsedKeys] = useState({
        key: "", color: ""})
    //This was challenging to get right
    const [pastGuesses, setPastGuesses] = useState<Array<Array<{key: string, color:string}>>>([])

    let countTurns = useRef(0)
    let matchCounter = useRef(0)

    //Saves typed input from user
    const handleChange = (e: KeyboardEvent) => {

        if (e.key === "Backspace") {
            if(userInput.length > 0) {
            setUserInput(previous => {
                return previous.slice(0, -1) 
                })
            } 
        return
        }
        else if (userInput.length < 8 && e.key != "Enter") {
            setUserInput(previous => previous + e.key)
        }
        else if (e.key === "Enter") {
            handleSubmit(e)
        }
        // console.log(userInput)
    }


    //This does almost everything right now. It's sort of a bloated mess.
    const handleSubmit = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && userInput.length === 8){

        // Checking if word has already been tried.
        if (history.includes(userInput)) {
            alert('You already tried this word. Please try again')
            return
        } else { setHistory(previous => {
            return [...previous, userInput]
        })}

        let solutionArr = [...bird]
        let formattedUserInput = [...userInput].map((letter) => {
            return {key: letter, color: 'grey'}
        })

        // Marking exact matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr[index] === letter.key) {
                formattedUserInput[index].color = 'green'
                solutionArr[index] = ''
                matchCounter.current++
            }
            // console.log(formattedUserInput)
        })

        // Marking partial matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr.includes(letter.key) && letter.color !== 'green') {
                formattedUserInput[index].color = 'yellow'
                solutionArr[solutionArr.indexOf(letter.key)] = ''
            } 
        })

        setPastGuesses((previous: any[]) => [...previous, formattedUserInput])
        // usedKeyTracker(formattedUserInput)
        setUserInput('')
        countTurns.current++
        setFirstTurn(false)
        gameOver()
        matchCounter.current = 0
        }else if (e.key === 'Enter' && userInput.length != 8) {
        alert('Word must be 8 characters!')}

        
    }

    //Used letters
    // const usedKeyTracker = (formattedUserInput: any[] | React.SetStateAction<{ key: string; color: string }>):any => {
    //     const newUsedKeys = formattedUserInput.reduce((access: { [x: string]: any }, current: { key: string | number; color: any }) => {
    //         access[current.key] = current.color
    //         return access
    //     },{})

    //     setUsedKeys({...usedKeys, ...formattedUserInput}) 

    //         formattedUserInput.forEach((l: { key: string | number; color: string }) => {
    //         const currentColor = usedKeys[l.key]
    
    //         if (l.color === 'green') {
    //             usedKeys[l.key] = 'green'
    //             return
    //         }
    //         if (l.color === 'yellow' && currentColor !== 'green') {
    //             usedKeys[l.key] = 'yellow'
    //             return
    //         }
    //         if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
    //             usedKeys[l.key] = 'grey'
    //             return
    //         }
    //         })
    
    //         // return usedKeys
    //     }
        console.log(matchCounter.current)
       
    // Wins & Losses

    const gameOver = () => {
        if (matchCounter.current === 8 && countTurns.current <=3) {
            alert('Excellent!')
        }
        else if (matchCounter.current === 8 && (countTurns.current >3 && countTurns.current <= 5)) {
            alert('Impressive!')
        }
        else if (matchCounter.current === 8 && (countTurns.current >5 && countTurns.current <= 6)) {
            alert('Great!')
        }
        else if (matchCounter.current === 8 && (countTurns.current >6 && countTurns.current <= 8)) {
            alert('Close call!')
        }

        else if (countTurns.current === 8 && matchCounter.current != 8) {
            alert(`The bird was ${bird}. Too bad.`)
        }
        
    }


        return {countTurns, matchCounter, userInput, pastGuesses, handleChange, firstTurn, usedKeys}

    }

    export default useGame