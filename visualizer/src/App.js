import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import { useState, useEffect } from 'react'

function App() {
  const [clearValue, setClearValue] = useState(false)
  const [message, setMessage] = useState('')

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

  return (
    <div className="App">
      <Header callBack={callbackFunction} />
      <Board clearValue={clearValue} incomingMessage={message}/>
    </div>
  );
}

export default App;
