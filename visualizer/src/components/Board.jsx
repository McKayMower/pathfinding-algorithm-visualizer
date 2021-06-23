import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const Board = ({ clearValue, incomingMessage }) => {

    const boardHeight = 29
    const boardWidth = 56

    const [board, setBoard] = useState([])
    const [startCoordinates, setStartCoordinates] = useState({ row: 15, col: 14 })
    const [stopCoordinates, setStopCoordinates] = useState({ row: 15, col: 42 })
    const [clickingStart, setClickingStart] = useState(false)
    const [clickingStop, setClickingStop] = useState(false)
    const [clickingCell, setClickingCell] = useState(false)
    const [key, setKey] = useState(0)
    const [algorithm, setAlgorithm] = useState('')
    const [canDraw, setCanDraw] = useState(true)
    let DFSarray = []
    let finished = false

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

    let visualizeStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'blue',
        transition: 'background-color 1s linear'
    }

    let stopStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'red',
    }

    //sets board on page loadup and when clear board is pressed
    useEffect(() => {
        setBoard(createBoard(boardHeight, boardWidth))
        setStopCoordinates({ row: 15, col: 42 })
        setStartCoordinates({ row: 15, col: 14 })
        setKey(prev => prev + 1)
    }, [clearValue])

    useEffect(() => {
        if (incomingMessage === 'visualize') {
            setCanDraw(false)
            handleAlgorithm()
            setCanDraw(true)
        }
        else {
            setAlgorithm(incomingMessage)
        }
    }, [incomingMessage])

    const handleDijkstras = () => {
        console.log('handling dijkstras')
    }

    const handleDFS = (row, col) => {

        if (row === stopCoordinates.row && col === stopCoordinates.col) {
            finished = true
        }
        if (!finished && !board[row][col].visited) {
            DFSarray.push({ row, col })
            board[row][col].visited = true

            if (!finished && col + 1 < boardWidth && !board[row][col + 1].cellWall) //right
                handleDFS(row, col + 1)
            if (!finished && row + 1 < boardHeight && !board[row + 1][col].cellWall) //down
                handleDFS(row + 1, col)
            if (!finished && col - 1 >= 0 && !board[row][col - 1].cellWall)
                handleDFS(row, col - 1) //left
            if (!finished && row - 1 >= 0 && !board[row - 1][col].cellWall)
                handleDFS(row - 1, col) //up
        }
    }

    const handleBFS = () => {
        console.log('handling bfs')
    }

    const handleAlgorithm = () => {
        switch (algorithm) {
            case 'dijkstras':
                handleDijkstras()
                break
            case 'depth-first':
                //bottom right corner start
                if (startCoordinates.col + 1 > boardWidth && startCoordinates.row + 1 > boardHeight)
                    handleDFS(startCoordinates.row, startCoordinates.col - 1)
                //furthest right side start
                else if (startCoordinates.col + 1 > boardWidth)
                    handleDFS(startCoordinates.row + 1, startCoordinates.col)
                else
                    handleDFS(startCoordinates.row, startCoordinates.col + 1)

                visualizeAlgorithm()
                break
            case 'breadth-first':
                handleBFS()
                break

            default: return
        }
    }

    const visualizeAlgorithm = () => {
        setKey(prev => prev + 1)
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
                    visualize: false,
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
                    board[ri][ci].cellWall = true
                }
                else {
                    event.target.style.backgroundColor = 'white'
                    event.target.className = 'cell'
                    board[ri][ci].cellWall = false
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
    }

    const handleCellClick = (event, ri, ci) => {
        if (event.target.style.backgroundColor === 'white') {
            event.target.style.backgroundColor = 'black'
            event.target.className = 'cell-wall'
        }
        else {
            event.target.style.backgroundColor = 'white'
            event.target.className = 'cell'
        }
    }

    if (canDraw) {
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
                                    else if (board[ri][ci].visited)
                                        return (<td className='visited' key={`${ri}-${ci}`} style={visualizeStyle}>{board[ri][ci].value}</td>)
                                    else {
                                        return (
                                            <td className='cell' key={`${ri}-${ci}`} style={style}
                                                onDragStart={(event) => { event.preventDefault() }}
                                                onPointerDown={(event) => {
                                                    handleCellClick(event, ri, ci)
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
            <table className='board' key={key} onDragStart={(event) => event.preventDefault()}>
                <tbody>
                    {board.map((row, ri) => {
                        return (
                            <tr className='row' key={ri} >
                                {row.map((col, ci) => {
                                    if (ri === startCoordinates.row && ci === startCoordinates.col)
                                        return (<td className='start-cell' key={`${ri}-${ci}`} style={startStyle} ></td>)
                                    else if (ri === stopCoordinates.row && ci === stopCoordinates.col)
                                        return (<td className='stop-cell' key={`${ri}-${ci}`} style={stopStyle}></td>)
                                    else if (board[ri][ci].visited)
                                        return (<td className='visited' key={`${ri}-${ci}`} style={visualizeStyle}></td>)
                                    else
                                        return (<td className='cell' key={`${ri}-${ci}`} style={style}></td>)
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
