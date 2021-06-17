import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const Board = ({ clearValue, incomingMessage }) => {

    const boardHeight = 29
    const boardWidth = 56

    const [board, setBoard] = useState([])
    const [clickingStart, setClickingStart] = useState(false)
    const [startCoordinates, setStartCoordinates] = useState({ row: 15, col: 14 })
    const [stopCoordinates, setStopCoordinates] = useState({ row: 15, col: 42 })
    const [clickingStop, setClickingStop] = useState(false)
    const [clickingCell, setClickingCell] = useState(false)
    const [key, setKey] = useState(0)
    const [message, setMessage] = useState('')
    const [canEdit, setCanEdit] = useState(true)
    let finished = false
    const DFSarray = []

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
        setBoard(createBoard(boardHeight, boardWidth))
        setStopCoordinates({ row: 15, col: 42 })
        setStartCoordinates({ row: 15, col: 14 })
        setKey(prev => prev + 1)
    }, [clearValue])

    useEffect(() => {
        if (incomingMessage === 'visualize') {
            setCanEdit(false)
            handleAlgorithm()
            setCanEdit(true)
        }
        else {
            setMessage(incomingMessage)
        }
    }, [incomingMessage])

    const handleDijkstras = () => {
        console.log('handling dijkstras')

    }

    const handleDFS = (row, col) => {
        console.log(`current row: ${row} current col: ${col}`);
        if(row === stopCoordinates.row && col === stopCoordinates.col) {
            console.log('reached stop coord')
            finished = true
            console.log(finished);
        }
        if (!finished && !board[row][col].visited) {
            DFSarray.push({row, col})
            board[row][col].visited = true
            if (!finished && col + 1 < boardWidth) //right
                handleDFS(row, col + 1)
            if (!finished && row + 1 < boardHeight) //down
                handleDFS(row + 1, col)
            if (!finished && col - 1 > 0)
                handleDFS(row, col - 1) //left
            if (!finished && row - 1 > 0)
                handleDFS(row - 1, col) //up
        }
    }

    const visualizeDFS = () => {
        console.log(DFSarray);
    }

    const handleBFS = () => {
        console.log('handling bfs')
    }

    const handleAlgorithm = () => {
        switch (message) {
            case 'dijkstras':
                handleDijkstras()
                break
            case 'depth-first':
                handleDFS(startCoordinates.row, startCoordinates.col)
                visualizeDFS()
                break
            case 'breadth-first':
                handleBFS()
                break

            default: return
        }
    }

    const createBoard = (rowCount, colCount) => {
        let board = [];
        for (let x = 0; x < rowCount; x++) {
            let col = [];
            for (let y = 0; y < colCount; y++) {
                col.push({
                    visited: false,
                    distance: Infinity,
                    prev: null,
                    cellWall: false,
                })
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

    if (canEdit) {
        return (
            <table className='board' key={key}
                onMouseLeave={() => {
                    setClickingCell(false)
                    setClickingStart(false)
                    setClickingStop(false)
                }}>
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
    else {
        return (
            <table className='board' key={key} onDragStart={(event)=>event.preventDefault()}>
                <tbody>
                    {board.map((row, ri) => {
                        return (
                            <tr className='row' key={ri} >
                                {row.map((col, ci) => {
                                    if (ri === startCoordinates.row && ci === startCoordinates.col) {
                                        return (
                                            <td className='start-cell' key={`${ri}-${ci}`} style={startStyle} ></td>)
                                    }
                                    else if (ri === stopCoordinates.row && ci === stopCoordinates.col) {
                                        return (
                                            <td className='stop-cell' key={`${ri}-${ci}`} style={stopStyle}></td>)
                                    }
                                    else {
                                        return (
                                            <td className='cell' key={`${ri}-${ci}`} style={style}></td>)
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        )
    }

}

export default Board
