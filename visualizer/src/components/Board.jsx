import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const Board = ({ clearValue }) => {

    const [board, setBoard] = useState([])
    const [clickingStart, setClickingStart] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({ row: 15, col: 14 })
    const [stopCoordinates, setStopCoordinates] = useState({ row: 15, col: 42 })
    const [clickingStop, setClickingStop] = useState(false)
    const [clickingCell, setClickingCell] = useState(false)

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

    //sets board on page loadup
    useEffect(() => {
        setBoard(createBoard(29, 56))
    }, [])

    const createBoard = (rowCount, colCount) => {
        let board = [];
        for (let x = 0; x < rowCount; x++) {
            let col = [];
            for (let y = 0; y < colCount; y++) {
                col.push({
                    visited: false,
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
                if (event.target.style.backgroundColor === 'white') {
                    event.target.style.backgroundColor = 'black'
                    event.target.className = 'cell-wall'
                }
                else {
                    event.target.style.backgroundColor = 'white'
                    event.target.className = 'cell'
                }
            }
        }
        else if (clickingStart) {
            if (event.target.className === 'stop-cell') { }
            else {
                event.target.style.backgroundColor = 'green'
                event.target.className = 'start-cell'
                setStartCoordinates({ row: ri, col: ci })
            }
        }
        else if (clickingStop) {
            if (event.target.className === 'start-cell') { }
            else {
                event.target.style.backgroundColor = 'red'
                event.target.className = 'stop-cell'
                setStopCoordinates({ row: ri, col: ci })
            }
        }
        else { }
    }

    const handleCellClick = (event) => {
        if (event.target.style.backgroundColor === 'white') {
            event.target.style.backgroundColor = 'black'
            event.target.className = 'cell-wall'
        }
        else {
            event.target.style.backgroundColor = 'white'
            event.target.className = 'cell'
        }
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
                                        <td className='start-cell' key={`${ri}-${ci}`} style={startStyle}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onPointerDown={() => {
                                                setClickingStart(true)
                                                setClickingCell(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)
                                }
                                else if (ri === stopCoordinates.row && ci === stopCoordinates.col) {
                                    return (
                                        <td className='stop-cell' key={`${ri}-${ci}`} style={stopStyle}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onPointerDown={() => {
                                                setClickingStop(true)
                                                setClickingStart(false)
                                                setClickingCell(false)
                                            }}
                                            onPointerUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)

                                }
                                else {
                                    return (
                                        <td className='cell' key={`${ri}-${ci}`} style={style}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onPointerDown={(event) => {
                                                handleCellClick(event)
                                                setClickingCell(true)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}
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
