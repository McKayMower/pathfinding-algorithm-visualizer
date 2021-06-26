import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import { useState, useEffect } from 'react'

function App() {
  const [clearValue, setClearValue] = useState(false)
  const [message, setMessage] = useState('')
  const [speed, setSpeed] = useState(100)
  const callbackFunction = (message) => {
    if (message === 'clear')
      setClearValue(!clearValue)
    else {
      setMessage(message)
    }
  }

  useEffect(() => {
    setMessage('')
  }, [clearValue])

  const set = (value) => {
    setSpeed(value)
  }

  return (
    <div className="App">
      <Header callBack={callbackFunction} speed={set} />
      <Board clearValue={clearValue} incomingMessage={message} speed={speed}/>
    </div>
  );
}

export default App;
