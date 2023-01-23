import React from 'react'

import Row from './Row'

interface PrevGuesses {
    key: string,
    color: string
}


interface GridProps {
    countTurns: React.MutableRefObject<number>
    userInput: string
    pastGuesses: Array<Array<PrevGuesses>>
    handleChange: (e: KeyboardEvent) => void
}

export default function Grid(props: GridProps) {

// let keystrokes = [...props.userInput]

    return (
        <div>
            
            {props.pastGuesses.map((letter, index) => {
                if(props.countTurns.current === index) {
                    return <Row key={index} guess={[]} userInput={props.userInput} />
                }
                if(props.pastGuesses !== undefined)
                return <Row key={index} guess={letter} userInput={''} />
            })}
        </div>
    )
}