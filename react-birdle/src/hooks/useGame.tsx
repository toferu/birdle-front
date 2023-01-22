import React, {useState, useRef} from 'react'

const useGame = ({bird}: {bird: string}) => {
    const [userInput, setUserInput] = useState('')
    // const [userArray, setUserArray] = useState<Array<string>>([])
    const [reveal, setReveal] = useState(false)
    const [formattedInput, setFormatted] = useState([{
        key: '',
        color: ''
    }])
    let countTurns = useRef(0)
    let matchCounter = useRef(0)
    // The fledgling of an idea below was to count keypresses and if == 8 then the conditions are met for handlesubmit. This is to prevent early submission on a users' guess, but now I'm seeing that resetting that value may be tricky? Actually maybe I just reset the value at the end of the handleSubmit.. After implementing that it now seems busted because using the delete key would still add to the keyPresses var.. OH If I instead compare the .length of a string of the keypresses that should do it! Wait... I only need to check the .length of the originally userInput state at that point right? AH but I need to reset the length at the end... Now I'm getting confused. Not to mention I'll need to do something like move the userInput of one from currentGuess to pastGuesses for the next iteration I think..   FormattedInput could be the old guess and I could reset userInput at the end of the handleSubmit??

    //I think formattedInput would need to be passed off to an array of objects like: guesses = [{
    //     key: '',
    //     color: ''
    // },
    // {
    //     key: '',
    //     color: ''
    // }]

    //etc.....But the example info above would be nested. I can't picture how the parent array of objects would look.. maybe [[{}],[{}],[{}]]? Not sure how to write that for typescript.
    const [keyPresses, setKeyPresses] = useState('')

    //Saves typed input from user and adds to wonky keypress counter.
    const handleChange = (e: KeyboardEvent) => {
        // setKeyPresses(e.key)
        setUserInput(e.key)
        // console.log(e.key)
    }
    //This does almost everything right now. It's sort of a bloated mess.
    const handleSubmit = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && userInput.length === 8){
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
        })

        // Marking partial matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr.includes(letter.key) && letter.color !== 'green') {
                formattedUserInput[index].color = 'yellow'
                solutionArr[solutionArr.indexOf(letter.key)] = ''
            }
        })
        setFormatted(formattedUserInput)
        setReveal(!reveal)
        countTurns.current++
        // keyPresses = 0
        gameOver()
    }}

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


    //in the onSubmit can do something like-- if submitted value != {bird} show {bird}

        return {countTurns, matchCounter, userInput, handleChange, handleSubmit}
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