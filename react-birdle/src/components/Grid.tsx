import React from 'react'

import Row from './Row'

interface GridProps {
    countTurns: React.MutableRefObject<number>
    userInput: string
    pastGuesses: Array<Array<object>>
    handleChange: (e: KeyboardEvent) => void
}

export default function Grid(props: GridProps) {

let guess = [...props.userInput]

    return (
        <div>
            
            {guess.map((letter, index) => {
                if(countTurns.current === index) {
                    return <Row key={index} userInput={userInput} />
                }
                return <Row key={index} guess={letter} />
            })}
        </div>
    )
}