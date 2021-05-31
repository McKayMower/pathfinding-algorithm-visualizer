import '../css for components/Header.css'
import '../css for components/Button.css'
import { useState } from 'react'

const handleRedirect = () => {
    console.log('page refresh here')
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

const Header = ({ callback }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [visualizeString, setVisualizeString] = useState('Show Me!')
    
    const sendCallback = () => {
        callback(true)
    }
    
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
                        <button onClick={() => {
                            handleDijkstras()
                            setVisualizeString('Show Me Dijkstra\'s!')
                        }}>Dijkstra's</button>
                        <button onClick={() => {
                            handleDFS()
                            setVisualizeString('Show Me Depth-First!')
                        }}>Depth-First</button>
                        <button onClick={() => {
                            handleBFS()
                            setVisualizeString('Show Me Breadth-First!')
                        }}>Breadth-First</button>
                    </div>
                }
            </button>

            <button
                className='visualize-button'
                onClick={() => {visualizeString === 'Show Me!' ?
                        setVisualizeString('Pick an Algorithm') : handleVisualization()
                }}>
                {visualizeString}
            </button>

            <button
                className='clear-button'
                onClick={sendCallback}>
                Clear Board
            </button>
        </div >
    )
}

export default Header
