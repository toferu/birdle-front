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
const word = [...bird]
// console.log(word)
const [userInput, setUserInput] = useState('')
const [userArray, setUserArray] = useState<Array<string>>([])
const [styleClass, setStyleClass] = useState(new Array(userArray.length).fill(''))
const [reveal, setReveal] = useState(false)
let countTurns = useRef(0)


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
    // let newArr = [...userInput]
    //     for (let i = 0; i <= word.length; i++) {
    //         if(userInput == bird){
    //             alert('You Win!')
    //             break
    //         } else {
    //         if(word[i] == newArr[i]){
    //             let bingo = [...styleCorrect]
    //             bingo[i] = "correct"
    //             setStyleCorrect(bingo)
    //             // setUserArray(newArr)
    //             continue      
    //         } 
    //         else if (word.includes(newArr[i])){
    //             let yellow = [...styleClass]
    //             yellow[i] = "yellow"
    //             setStyleClass(yellow)
    //             // setUserArray(newArr)
    //             continue 
    //         } else { continue }
    //     }}
    //     setUserArray(newArr)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newArr = [...userInput]
    let newStyle = new Array(word.length).fill('')
    // let wordSet = new Set(word)
    if (countTurns.current <= 8) {
        for (let i = 0; i < word.length; i++) {
            if(word[i] == newArr[i]){
                // let newStyle = [...styleClass]
                newStyle[i] = "correct"
                // setStyleClass(newStyle)
                // setUserArray(newArr)
                // continue      
            } else if (word.includes(newArr[i])){
                // let newStyle = [...styleClass]
                newStyle[i] = "yellow"
                // setStyleClass(newStyle)
                // setUserArray(newArr)
                // continue 
            }
            setStyleClass(newStyle)
            setUserArray(newArr)
            
            if(userInput == bird){
                alert('You Win!')
                break
        }}



    // let newArr = [...userInput]
    //     for (let i = 0; i < word.length; i++) {
    //         if(userInput == bird){
    //             alert('You Win!')
    //             break
    //         } else {
    //         if(word[i] == newArr[i]){
    //             let bingo = [...styleCorrect]
    //             bingo[i] = "correct"
    //             setStyleCorrect(bingo)
    //             setUserArray(newArr)
    //             continue      
    //         } 
    //         else if (word.includes(newArr[i])){
    //             let yellow = [...styleClass]
    //             yellow[i] = "yellow"
    //             setStyleClass(yellow)
    //             setUserArray(newArr)
    //             continue 
    //         } else { setUserArray(newArr)}
    //     }}
    // setUserArray(newArr)    
    setReveal(!reveal)
    countTurns.current++
    } else { alert(`The bird was ${bird}. Too bad.`)}
}


//in the onSubmit can do something like-- if submitted value != {bird} show {bird}

console.log(countTurns)

    return (
        <div className='grid'>
            <p>{bird}</p>

            <form onSubmit={handleSubmit}>
                {reveal ? userArray.map((letter, index) => (
                <span key={index} className={styleClass[index]}>
                {letter}
                </span>))
                    : <input autoFocus className='tile' type='text' placeholder='        ' minLength={8} maxLength={8} onChange={handleChange}></input>} <input id='submission' type='submit'></input><br/></form>
                {/* {setReveal(false)} */}
                <form onSubmit={handleSubmit}>
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/></form>
                 {/* {setReveal(false)} */}
                {/* {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/>
                {setReveal(false)}
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/>
                {setReveal(false)}
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/>
                {setReveal(false)}
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/>
                {setReveal(false)}
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></ input>} <br/>
                {setReveal(false)}
                {reveal ? userArray.map((letter, index) => (
                            <span key={index} className={styleClass[index]}>
                            {letter}
                            </span>))
                                : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/> */}

                
            {/* </form> */}
        </div>
  );
}

export default Game