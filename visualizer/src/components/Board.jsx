import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const Board = ({ clearValue }) => {

    const [board, setBoard] = useState([])
    const [clickingStart, setClickingStart] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({ row: 15, col: 14 })
    const [clickingStop, setClickingStop] = useState(false)
    const [stopCoordinates, setStopCoordinates] = useState({ row: 15, col: 42 })
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

    //sets board on mount
    useEffect(() => {
        setBoard(createBoard(29, 56))
    }, [])

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
            if (event.currentTarget.className === 'start-cell' || event.currentTarget.className === 'stop-cell') { }
            else {
                event.currentTarget.style.backgroundColor === 'white' ?
                    event.currentTarget.style.backgroundColor = 'black' : event.currentTarget.style.backgroundColor = 'white'
            }
        }
        else if (clickingStart) {
            if (event.currentTarget.className === 'stop-cell') { }
            else {
                event.currentTarget.style.backgroundColor = 'green'
                event.currentTarget.className = 'start-cell'
                setStartCoordinates({row: ri, col: ci })
            }
        }
        else if (clickingStop) {
            if (event.currentTarget.className === 'start-cell') { }
            else {
                event.currentTarget.style.backgroundColor = 'red'
                event.currentTarget.className = 'stop-cell'
                setStopCoordinates({row: ri, col: ci })
            }
        }
        else { }
    }

    const handleSSLeave = (event, ci, ri) => {
        if (clickingStart) {
            event.currentTarget.className = 'cell'
            event.currentTarget.style.backgroundColor = 'white'
        }
        else if (clickingStop) {
            event.currentTarget.className = 'cell'
            event.currentTarget.style.backgroundColor = 'white'
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
                                            onPointerOut={(event) => { handleSSLeave(event, ci, ri) }}
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
                                            onPointerOut={(event) => { handleSSLeave(event, ci, ri) }}
                                            onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}
                                        >
                                        </td>)

                                }
                                else {
                                    return (
                                        <td className='cell' key={`${ri}-${ci}`} style={style}
                                            onDragStart={(event) => { event.preventDefault() }}
                                            onPointerDown={() => {
                                                setClickingCell(true)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerUp={() => {
                                                setClickingCell(false)
                                                setClickingStart(false)
                                                setClickingStop(false)
                                            }}
                                            onPointerOut={(event) => { handleSSLeave(event, ci, ri) }}
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
