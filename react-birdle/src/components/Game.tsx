import React, {useState} from 'react'

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
console.log(word)
const [userInput, setUserInput] = useState('')
const [userArray, setUserArray] = useState<Array<string>>([])
const [styleClass, setStyleClass] = useState<Array<string>>([])
const [reveal, setReveal] = useState(Boolean)

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newArr = [...userInput]
        for (let i = 0; i < word.length; i++) {
            if(word[i] == newArr[i]){
            let bingo = [...styleClass]
            bingo[i] = "correct"
            setStyleClass(bingo)     
            } else if (newArr[i].includes(word[i])){
                let yellow = [...styleClass]
                yellow[i] = "yellow"
                setStyleClass(yellow)
            } else { setUserArray(newArr)}
        }
    setUserArray(newArr)    
    setReveal(true)
}


//in the onSubmit can do something like-- if submitted value != {bird} show {bird}



    return (
        <div className='grid'>
            <p>{bird}</p>

            <form onSubmit={handleSubmit}>
            {reveal ? userArray.map((letter, index) => (
            <span key={index} className={styleClass[index]}>
            {letter}
            </span>))
                 : <input autoFocus className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>} <br/>

                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input><br/>
                <input className='tile' type='text' placeholder='        ' maxLength={8} onChange={handleChange}></input>
                <input id='submission' type='submit'></input>
                
            </form>
        </div>
  );
}

export default Game