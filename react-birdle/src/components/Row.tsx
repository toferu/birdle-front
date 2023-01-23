import React, { useEffect } from 'react'

interface UserGuess {
    key: string,
    color: string
}

interface RowProps {
    guess: Array<UserGuess>
    userInput: string
    // pastGuesses: Array <UserGuess>
}
    // function Row({ countTurns, userInput, pastGuesses, handleChange, firstTurn }: GridProps) {

const Row = ({userInput, guess}: RowProps) => {

console.log(userInput)

    if (guess) {
        return (
            <div className='past row'>
                {guess.map((letter, index) => (
                    <div key={index} className={letter.color}>{letter.key}</div>
                ))}
            </div>
        )
    } 

    console.log(userInput)
//This part should show what's being typed, but it doesn't
   if (userInput) {
      let letters = userInput.split('')

      return (
        <div className="row current">
          {letters.map((letter, index) => (
            <div key={index} className="filled">{letter}</div>
          ))}
          {[...Array(8 - letters.length)].map((x,index) => (
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
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  
}
export default Row