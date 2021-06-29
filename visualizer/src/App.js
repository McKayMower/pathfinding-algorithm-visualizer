import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import { useState, useEffect } from 'react'

function App() {
  const [algorithm, setAlgorithm] = useState('')
  const [visualizeCommand, setVisualizeCommand] = useState('')
  const [clearBoard, setClearBoard] = useState(0)
  const [clearPath, setClearPath] = useState(0)
  const [pausePlay, setPausePlay] = useState()

  const setAlgo = (algo) => {
    setAlgorithm(algo)
  }

  const setVisualizeCom = (com) => {
    setVisualizeCommand(com)
  }

  const setClearBo = (com) => {
    setClearBoard(com)
  }
  
  const setClearPa = (com) => {
    setClearPath(com)
  }

  const setPP = (com) => {
    setPausePlay(com)
  }
  
  return (
    <div className="App">
      <Header outgoingAlgorithm={setAlgo} 
              outgoingClearBoard={setClearBo} 
              outgoingClearPath={setClearPa} 
              outgoingVisualizeCommand={setVisualizeCom}
              outgoingPausePlay={setPP}/>
      <Board incomingAlgorithm={algorithm} 
             incomingClearBoard={clearBoard} 
             incoming ClearPath={clearPath} 
             incomingVisualizeCommand={visualizeCommand}
             incomingPausePlay={pausePlay}/>
    </div>
  );
}

export default App;
