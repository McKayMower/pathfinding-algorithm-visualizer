import '../css for components/Header.css'
import { useState, } from 'react'

const Header = ({ outgoingAlgorithm, outgoingClearBoard, outgoingClearPath, outgoingVisualizeCommand, outgoingPausePlay }) => {

    const sendAlgorithm = (message) => {
        outgoingAlgorithm(message)
    }

    const sendClearBoard = () => {
        outgoingClearBoard(Math.random())
    }

    const sendClearPath = () => {
        outgoingClearPath(Math.random())
    }

    const sendVisualize = () => {
        outgoingVisualizeCommand(Math.random())
    }

    const sendPausePlay = () => {
        outgoingPausePlay(paused)
    }

    const [showMenu, setShowMenu] = useState(false)
    const [visualizeString, setVisualizeString] = useState('Show Me!')
    const [paused, setPaused] = useState(true)
    const [visualizing, setVisualizing] = useState(false)

    return (
        <div className='header-container'>

            <h1 className='title'
                onClick={() => window.location.reload()}>Pathfinding Visualizer</h1>

            <button className='algo-select'
                onClick={() => setShowMenu(!showMenu ? true : false)}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}>
                Select Algorithm
                {showMenu &&
                    <div className='menu'>
                        <button onClick={() => {
                            sendAlgorithm('dijkstras')
                            setVisualizeString('Show Me Dijkstra\'s!')
                        }}>Dijkstra's</button>
                        <button onClick={() => {
                            sendAlgorithm('depth-first')
                            setVisualizeString('Show Me Depth-First!')
                        }}>Depth-First</button>
                        <button onClick={() => {
                            sendAlgorithm('breadth-first')
                            setVisualizeString('Show Me Breadth-First!')
                        }}>Breadth-First</button>
                    </div>
                }
            </button>
            <button
                className='visualize-button'
                onClick={() => {
                    sendVisualize()
                    visualizeString === 'Show Me!' ? setVisualizeString('Pick an Algorithm') 
                                                   : setVisualizing(true)
                    setPaused(false)
                }}>
                {visualizeString}
            </button>
            <button className='clear-board-button'
                onClick={() => {
                    sendClearBoard('clear board')
                    setVisualizeString('Show Me!')
                }}
            >
                Clear Board
            </button>
            <button className='clear-path-button'
                onClick={() => {
                    sendClearPath('clear path')
                    setVisualizeString('Show Me!')
                }}
            >
                Clear Path
            </button>

            { visualizing &&
                <button className='pause-play-button'
                    onClick={() => {
                        paused ? setPaused(false) : setPaused(true)
                        sendPausePlay()
                    }}
                >
                    {paused ? 'Resume Visualization' : 'Pause Visualization'}
                </button>
            }

        </div >

    )
}

export default Header
