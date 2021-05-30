import '../css for components/Header.css'
import '../css for components/Button.css'
import { useState } from 'react'

const handleRedirect = () => {
    console.log('page refresh here')
}

const handleBoardReset = () => {
    console.log('reset board here')
}
const handleDijkstras = () => {
    console.log('handle dijkstras');
}

const handleDFS = () => {
    console.log('handle DFS');
}

const handleBFS = () => {
    console.log('handle BFS');
}

const handleVisualization = () => {
    console.log('handle visualization');
}

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className='header-container'>
            <h1 className='title' onClick={() => handleRedirect()}>Pathfinding Visualizer</h1>
            <button className='algo-select'
                onClick={() => setShowMenu(!showMenu ? true : false)}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}>
                Select Algorithm
                {showMenu &&
                    <div className='menu'>
                        <button onClick={() => {handleDijkstras() }}>Dijkstra's</button>
                        <button onClick={() => {handleDFS()}}>DFS</button>
                        <button onClick={() => {handleBFS()}}>BFS</button>
                    </div>
                }
            </button>

            <button
                className='visualize-button'
                onClick={()=>{ handleVisualization() }}>
                Visualize Algorithm!
            </button>

            <button
                className='clear-button'
                onClick={() => { handleBoardReset() }}>
                Clear Board
            </button>
        </div>
    )
}

export default Header
