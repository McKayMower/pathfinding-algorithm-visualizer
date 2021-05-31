import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import {useState} from 'react'

function App() {
  const [clearBoard, setClearBoard] = useState(false)

  const getClearBoard = (clearValue) => {
    setClearBoard(clearValue)  
  }

  return (
    <div className="App">
      <Header callback={getClearBoard}/>
      <Board callback={getClearBoard} clearValue={clearBoard}/>
    </div>
  );
}

export default App;
