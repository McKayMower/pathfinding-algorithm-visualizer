import '../css for components/Header.css'
import { useState,useEffect } from 'react'
import Slider from '@material-ui/core/Slider';

const handleRedirect = () => {
    console.log('page refresh here')
}

const Header = ({ callBack, speed }) => {

    const sendCallback = (message) => {
        callBack(message)
    }
    const valuetext = (value) => {
        setSpeedValue(value)
    }

    const sendSpeed = (value) => {
        speed(value)
    }
    const [showMenu, setShowMenu] = useState(false)
    const [visualizeString, setVisualizeString] = useState('Show Me!')
    const [speedValue, setSpeedValue] = useState(100)

    useEffect(() => {
        sendSpeed(speedValue)
    }, [speedValue])

    return (
        <div className='header-container'>

            <h1 className='title'
                onClick={() => handleRedirect()}>Pathfinding Visualizer</h1>
            <div className='slider2'>
                <Slider
                    defaultValue={0.00000005}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.00000001}
                    marks
                    min={-0.00000005}
                    max={0.0000001}
                    valueLabelDisplay="auto"
                />
            </div>
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
            <div className='slider'>
                <Slider
                    defaultValue={100}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={25}
                    marks
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                />
            </div>
        </div >
    )
}

export default Header
