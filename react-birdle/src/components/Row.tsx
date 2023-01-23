import React from 'react'

interface UserGuess {
    key: string,
    color: string
}

interface RowProps {
    guess: Array<UserGuess>
    userInput: string
    // pastGuesses: Array <UserGuess>
}

export default function Row(props: RowProps) {

    if (props.guess != undefined) {
        return (
            <div className='past row'>
                {props.guess.map((letter, index) => (
                    <div key={index} className={letter.color}>{letter.key}</div>
                ))}
            </div>
        )
    }


  if (props.userInput) {
    let letters = props.userInput.split('')

    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div key={index} className="filled">{letter}</div>
        ))}
        {[...Array(8 - letters.length)].map((_,index) => (
          <div key={index}></div>
        ))}
      </div>
    )
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  
}
