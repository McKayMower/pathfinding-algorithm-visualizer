import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const Board = ({ clearValue }) => {

    const [board, setBoard] = useState([])
    const [clickingCell, setClickingCell] = useState(false)
    const [clickingStart, setClickingStart] = useState(false)
    const [clickingStop, setClickingStop] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({ row: 15, col: 14 })
    const [stopCoordinates, setStopCoordinates] = useState({ row: 15, col: 42 })

    const createBoard = (rowCount, colCount) => {
        let board = [];
        for (let x = 0; x < rowCount; x++) {
            let col = [];
            for (let y = 0; y < colCount; y++) {
                col.push({
                    x: x,
                    y: y,
                    visited: false,
                    isWall: false,
                    isStart: false,
                    isStop: false,
                    distance: Infinity,
                    prev: null,
                });
            }
            board.push(col);
        }
        return board
    }

    const handleMouseOver = (event, ci, ri) => {
        if (clickingCell) {
            if (event.target.className === 'start-cell' || event.target.className === 'stop-cell') { }
            else {
                event.target.style.backgroundColor === 'white' ?
                    event.target.style.backgroundColor = 'black' : event.target.style.backgroundColor = 'white'
            }
        }
        else if (clickingStart) {
            if (event.target.className === 'stop-cell') { }
            else {
                event.target.style.backgroundColor = 'green'
                event.target.className = 'start-cell'
                setStartCoordinates({ ri, ci })
            }
        }
        else if (clickingStop) {
            if (event.target.className === 'start-cell') { }
            else {
                event.target.style.backgroundColor = 'red'
                event.target.className = 'stop-cell'
                setStopCoordinates({ ri, ci })
            }
        }
        else { }
    }

    const handleSSLeave = (event, ci, ri) => {
        if (clickingStart) {
            event.target.className = 'cell'
            event.target.style.backgroundColor = 'white'
            console.log(startCoordinates);
        }
        else if (clickingStop) {
            event.target.className = 'cell'
            event.target.style.backgroundColor = 'white'
            console.log(stopCoordinates);
        }
    }

    //creates new board
    useEffect(() => {
        setBoard(createBoard(29, 56))
    }, [])

    let style = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'white',
    }

    let startStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'green',
    }
    let stopStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'red',
    }

    return (
        <table className='board' >
            <tbody>
                {board.map((row, ri) => {
                    return (
                        <tr className='row' key={ri} >
                            {row.map((col, ci) => {
                                if (ri === startCoordinates.row && ci === startCoordinates.col) {
                                    return (
                                        <td className='start-cell'
                                            style={startStyle}
                                            key={ri + '-' + ci}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onMouseDown={(event) => {
                                                setClickingStart(true)
                                                setClickingCell(false)
                                                setClickingStop(false)
                                            }}
                                            onMouseUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}

                                            onMouseOut={(event) => { handleSSLeave(event, ci, ri) }}
                                            onMouseOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)
                                }
                                else if (ri === stopCoordinates.row && ci === stopCoordinates.col) {
                                    return (
                                        <td className='stop-cell'
                                            style={stopStyle}
                                            key={ri + '-' + ci}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onMouseDown={(event) => {
                                                setClickingStop(true)
                                                setClickingStart(false)
                                                setClickingCell(false)
                                            }}
                                            onMouseUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onMouseOut={(event) => { handleSSLeave(event, ci, ri) }}
                                            onMouseOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)

                                }
                                else {
                                    return (
                                        <td className='cell'
                                            style={style}
                                            key={ri + '-' + ci}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onMouseDown={(event) => {
                                                setClickingCell(true)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onMouseUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onMouseOut={(event) => { handleSSLeave(event, ci, ri) }}
                                            onMouseOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)
                                }
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )

}

export default Board
