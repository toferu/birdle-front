import React, {useState, useRef} from 'react'

// interface Props {
// id: number,
// name: string,
// image: string
// }

//I want to use focus here to only allow one input field at a time to be populated.
//Inside the component I will write logic that checks the birdWord's letters for matches. I may possibly need to transform the string to an array first?
//I'm hoping I can use CSS to make the input fields look like tiles with borders around the individual characters but unsure how that would work when it's empty now that I think about it. Maybe with spaces as placeholders?
const Game = ({bird}: {bird: string}) => {
    const [userInput, setUserInput] = useState('')
    const [userArray, setUserArray] = useState<Array<string>>([])
    const [reveal, setReveal] = useState(false)
    const [formattedInput, setFormatted] = useState([{
        key: '',
        color: ''
    }])
    let countTurns = useRef(0)

    // const formatting = () => {
    //     let solutionArr = [...bird]
    //     let formattedUserInput = [...userInput].map((letter) => {
    //         return {key: letter, color: 'grey'}
    //     })

    //     // Marking exact matches
    //     formattedUserInput.forEach((letter, index) => {
    //         if (solutionArr[index] === letter.key) {
    //             formattedUserInput[index].color = 'green'
    //             solutionArr[index] = ''
    //         }
    //     })

    //     // Marking partial matches
    //     formattedUserInput.forEach((letter, index) => {
    //         if (solutionArr.includes(letter.key) && letter.color !== 'green') {
    //             formattedUserInput[index].color = 'yellow'
    //             solutionArr[solutionArr.indexOf(letter.key)] = ''
    //         }
    //     })
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let solutionArr = [...bird]
        let formattedUserInput = [...userInput].map((letter) => {
            return {key: letter, color: 'grey'}
        })

        // Marking exact matches
        formattedUserInput.forEach((letter, index) => {
            if (solutionArr[index] === letter.key) {
                formattedUserInput[index].color = 'green'
                solutionArr[index] = ''
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
        // } else { alert(`The bird was ${bird}. Too bad.`)}
    }


    //in the onSubmit can do something like-- if submitted value != {bird} show {bird}

    console.log(formattedInput)

        return (
            <div className='grid'>
                <p>{bird}</p>

                <form onSubmit={handleSubmit}>
                    {reveal ? formattedInput.map((letter, index) => (
                    <span key={index} className={letter.color}>
                    {letter.key}
                    </span>))
                        : <input autoFocus className='tile' type='text' placeholder='        ' minLength={8} maxLength={8} onChange={handleChange}></input>} <input id='submission' type='submit'></input><br/></form>

            </div>
    );
    }

    export default Game