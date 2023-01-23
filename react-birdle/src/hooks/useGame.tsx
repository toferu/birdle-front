import React, {useState, useRef} from 'react'

const useGame = ({bird}: {bird: string}) => {
    const [userInput, setUserInput] = useState('')
    const [history, setHistory] = useState<Array<string>>([])

    //This is stupid
    // interface GuessData {
    //     key: string,
    //     color: string
    // }
    // interface Guesses {
    //     guess1: Array<GuessData>
    //     guess2: Array<GuessData>
    //     guess3: Array<GuessData>
    //     guess4: Array<GuessData>
    //     guess5: Array<GuessData>
    //     guess6: Array<GuessData>
    //     guess7: Array<GuessData>
    //     guess8: Array<GuessData>
    // }
    // const [pastGuesses, setPastGuesses] = useState<Array<Guesses>>([])
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
        console.log(userInput)
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
        console.log(typeof formattedUserInput)
        // Marking exact matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr[index] === letter.key) {
                formattedUserInput[index].color = 'green'
                solutionArr[index] = ''
                matchCounter.current++
            }
            console.log(formattedUserInput)
        })

        // Marking partial matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr.includes(letter.key) && letter.color !== 'green') {
                formattedUserInput[index].color = 'yellow'
                solutionArr[solutionArr.indexOf(letter.key)] = ''
            } 
        })

        setPastGuesses((previous: any[]) => [...previous, formattedUserInput])
        setUserInput('')
        console.log(pastGuesses)
        countTurns.current++
        gameOver()
        }else if (e.key === 'Enter' && userInput.length != 8) {
        alert('Word must be 8 characters!')}
    }

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


        return {countTurns, matchCounter, userInput, pastGuesses, handleChange, handleSubmit}

    }

    export default useGame