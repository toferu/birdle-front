import {useState, useEffect} from 'react';
import axios from 'axios'
import UI from './components/UI'
import './App.css';



const App = () => {
// These are the variables where data gathered from database are stored and passed as State
const [birdArray, setBirdArray] = useState([{
  id: 0,
  name: "",
  image: "",
}])
const [birdWord, setBirdWord] = useState("")

//This variable makes toggling the url for testing easier
const url = 'https://birdlegotback.herokuapp.com/api/birdle'

// This checks to see if birdArray is already loaded. If not, it does an axios get request to the server for the array of data. Else, it returns the already loaded array.
const getWord= () => {
  let i = Math.floor(Math.random() * birdArray.length)
  if (birdArray[i].name.length < 8) {
  axios.get(url)
  .then((response) => setBirdArray(response.data), (err) => console.log(err))
  .catch((error) => console.log(error))
  } else {return birdArray}
}

//This function sets the birdWord state in order to pass it to the Game child component.
const pickBird = () => {
  getWord()
  let pick = Math.floor(Math.random() * birdArray.length)
  setBirdWord(birdArray[pick].name)
}

//I was having issue getting the word to load on page refresh--even if it was already determined. This if statement solves takes care of this, and a new word is selected each time. This may not be ideal in the long run, but works for now.
useEffect (() => {
  if (birdWord.length < 8) {
    pickBird()}
}, )


console.log(birdArray)
console.log(birdWord)
  return (
    <div className="App">
      <h1>Birdle </h1>
      <br/>
      <br/>
      {/* <img src='../public/crow-solid.svg'></img> */}
      <UI bird={birdWord} />
    </div>
  );
}

export default App;
