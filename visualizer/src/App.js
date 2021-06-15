import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import {useState} from 'react'

function App() {
  const [clearValue, setClearValue] = useState(false)

  const callbackFunction = (value) => {
      setClearValue(!clearValue)
  }

  return (
    <div className="App">
      <Header callBack={callbackFunction}/>
      <Board clearValue={clearValue}/>
    </div> 
  );
}

export default App;
