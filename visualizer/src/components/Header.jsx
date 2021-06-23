import '../css for components/Header.css'
import { useState } from 'react'

const handleRedirect = () => {
    console.log('page refresh here')
}

const Header = ( {callBack} ) => {

    const sendCallback = (message) => {
        callBack(message)
    }

    const [showMenu, setShowMenu] = useState(false)
    const [visualizeString, setVisualizeString] = useState('Show Me!')

    return (
        <div className='header-container'>
            <h1 className='title' 
                onClick={() => handleRedirect()}>Pathfinding Visualizer</h1>
            <button className='algo-select'
                onClick={() => setShowMenu(!showMenu ? true : false)}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}>
                Select Algorithm
                {showMenu && 
                    <div className='menu'>
                        <button onClick={() => {
                            sendCallback('dijkstras')
                            setVisualizeString('Show Me Dijkstra\'s!')
                        }}>Dijkstra's</button>
                        <button onClick={() => {
                            sendCallback('depth-first')
                            setVisualizeString('Show Me Depth-First!')
                        }}>Depth-First</button>
                        <button onClick={() => {
                            sendCallback('breadth-first')
                            setVisualizeString('Show Me Breadth-First!')
                        }}>Breadth-First</button>
                    </div>
                }
            </button>

            <button
                className='visualize-button'
                onClick={() => {
                    sendCallback('visualize')
                    visualizeString === 'Show Me!' && setVisualizeString('Pick an Algorithm')
                }}>
                {visualizeString}
            </button>

            <button className='clear-button'
                onClick={() => {
                    sendCallback('clear')
                    setVisualizeString('Show Me!')
                }}
                >
                Clear Board
            </button>
        </div >
    )
}

export default Header
