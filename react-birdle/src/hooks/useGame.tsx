import React, {useState, useRef} from 'react'

const useGame = ({bird}: {bird: string}) => {
    const [userInput, setUserInput] = useState('')
    const [history, setHistory] = useState<Array<string>>([])
    const [reveal, setReveal] = useState(false)
    // const [formattedInput, setFormatted] = useState([{
    //     key: '',
    //     color: ''
    // }])
    const [pastGuesses, setPastGuesses] = useState<Array<Array<object>>>([[{}]])
    let countTurns = useRef(0)
    let matchCounter = useRef(0)
 
    const [keyPresses, setKeyPresses] = useState('')

    //Saves typed input from user and adds to wonky keypress counter.
    const handleChange = (e: KeyboardEvent) => {
        // setKeyPresses(e.key)
        if (e.key === "Backspace") {
            // e.preventDefault()
            if(userInput.length > 0) {
            setUserInput(previous => {
                console.log('previous', previous)
                return previous.slice(0, -1) 
            })
        } return
        }else if (userInput.length < 8) {
            console.log(userInput)
            setUserInput(previous => previous + e.key)
            console.log(userInput)
        }
         

        
    //    console.log(userInput)
        // if (history.includes(userInput)) {
        //     alert('You already tried this word. Please try again')
        //     return
        // }
        
    }
    //This does almost everything right now. It's sort of a bloated mess.
    const handleSubmit = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && userInput.length === 8){


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
        })

        // Marking partial matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr.includes(letter.key) && letter.color !== 'green') {
                formattedUserInput[index].color = 'yellow'
                solutionArr[solutionArr.indexOf(letter.key)] = ''
            }
        })
        //I was trying to use the var 'formattedInput' before, but I think 'pastGuesses' is formatted properly to store multiple arrays of objects inside an array
        setPastGuesses(previous => [{...previous, formattedUserInput}])
        setUserInput('')
        // setReveal(!reveal) --> I'll probably still need this.
        countTurns.current++
        // keyPresses = 0
        gameOver()
    }}

    // console.log(userInput)
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
    //         <div className='grid'>
    //             <p>{bird}</p>
    //             <form onSubmit={handleSubmit}>
    //                 {reveal ? formattedInput.map((letter, index) => (
    //                 <span key={index} className={letter.color}>
    //                 {letter.key}
    //                 </span>))
    //                     : <input autoFocus className='tile' type='text' placeholder='    ' minLength={8} maxLength={8} onChange={handleChange}></input>} <input id='submission' type='submit'></input><br/></form>


    //         </div>
    // );
    }

    export default useGame