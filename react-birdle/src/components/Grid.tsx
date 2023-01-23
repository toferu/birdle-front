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
    firstTurn: boolean
}

export default function Grid(props: GridProps) {

    const filteredPastGuesses = props.pastGuesses.filter((_, index) => index !== props.countTurns.current);

//     return (
//         <div>
//             {filteredPastGuesses.map((letter, index) => {
//                 return <Row key={index} guess={letter} userInput={''} />
//             })}
//             <Row key={props.countTurns.current} guess={[]} userInput={props.userInput} />
//         </div>
//     )
// console.log(props.pastGuesses.length)

//         }
// console.log(props.userInput)
    return (
        <div>
            {props.pastGuesses.map((letter, index) => {
                if(props.countTurns.current === index) {
                    return <Row key={index} userInput={''} guess={[]}   />
                }else{
                return <Row key={index} userInput={props.userInput} guess={letter}/>
            }})} 
        </div>
        
    )
}

