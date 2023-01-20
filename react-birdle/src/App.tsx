import {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

const App = () => {

const url = 'http://localhost:8000/api/birdle'

const [birdArray, setBirdArray] = useState([])
const [birdWord, setBirdWord] = useState('')


const getWord: any = () => {
  axios.get(url)
  .then((response) => setBirdArray(response.data), (err) => console.log(err))
  .catch((error) => console.log(error))
}

const pickBird: any = () => {
  let pick = Math.floor(Math.random() * birdArray.length)
  setBirdWord(birdArray[pick])
}

useEffect (() => {
  getWord()
  pickBird()
}, [])

console.log(birdArray)
console.log(birdWord)
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
