import { useState, useEffect } from 'react'
import '../css for components/Board.css'
import PriorityQueue from 'js-priority-queue'

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
    const [canDraw, setCanDraw] = useState(true)
    const [algorithm, setAlgorithm] = useState('')

    let interStop = 0
    let finished = false
    let traversed = []
    let fifo = []
    
    let style = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'white',
    }

    let wallStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'black',
    }

    let startStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: 'green',
    }

    let findingStyle = {
        width: '25px',
        height: '25px',
        border: '0.5px solid black',
        backgroundColor: '#2596be',
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
        clearInterval(interStop)
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

    const createBoard = (rowCount, colCount) => {
        let board = [];
        for (let x = 0; x < rowCount; x++) {
            let col = [];
            for (let y = 0; y < colCount; y++) {
                col.push({
                    visited: false,
                    distance: 100,
                    prev: null,
                    cellWall: false,
                    visualize: false,
                    start: false,
                    stop: false,
                    finding: false,
                })
            }
            board.push(col);
        }
        return board
    }

    const handleDijkstras = () => {
        board[startCoordinates.row][startCoordinates.col].distance = 0
        var queue = new PriorityQueue({comparator: function(a,b) {
            return a.distance - b.distance
        }});

        board.forEach((row, ri) => {
            row.forEach((col, ci) => {
                queue.queue(board[ri][ci])
            })
        })
        while(queue.length) {
            let curr = queue.dequeue()
            //foreach neighbor (up,down,left,right) of curr
            
        }
    }

    const handleDFS = (row, col) => {

        if (row === stopCoordinates.row && col === stopCoordinates.col) {
            finished = true
        }

        if (!finished && !board[row][col].visited) {
            if (!board[row][col].stop && !board[row][col].start) {
                board[row][col].visited = true
                traversed.push({ row, col })
            }
            if (!finished && col + 1 < boardWidth && !board[row][col + 1].cellWall && !board[row][col + 1].start && !board[row][col + 1].visited) { //right
                //console.log(`right ${row} ${col}`);
                handleDFS(row, col + 1)
            }
            if (!finished && row + 1 < boardHeight && !board[row + 1][col].cellWall && !board[row + 1][col].start && !board[row + 1][col].visited) { //down
                //console.log(`down ${row} ${col}`);
                handleDFS(row + 1, col)
            }
            if (!finished && col - 1 >= 0 && !board[row][col - 1].cellWall && !board[row][col - 1].start && !board[row][col - 1].visited) { //left
                //console.log(`left ${row} ${col}`);
                handleDFS(row, col - 1)
            }
            if (!finished && row - 1 >= 0 && !board[row - 1][col].cellWall && !board[row - 1][col].start && !board[row - 1][col].visited) { //up
                //console.log(`up ${row} ${col}`);
                handleDFS(row - 1, col)
            }
        }
    }

    const handleBFS = (row, col) => {
        board[row][col].visited = true
        fifo.push({ row, col })

        while (!finished && fifo.length > 0) {
            let curr = fifo.shift()
            let crow = curr.row
            let ccol = curr.col
            traversed.push({ row: crow, col: ccol })
            if (crow === stopCoordinates.row && ccol === stopCoordinates.col) {
                finished = true
            }
            if (ccol + 1 < boardWidth && !board[crow][ccol + 1].visited && !board[crow][ccol + 1].cellWall) { //right
                let temp = ccol + 1
                board[crow][ccol + 1].visited = true
                fifo.push({ row: crow, col: temp })
            }
            if (crow + 1 < boardHeight && !board[crow + 1][ccol].visited && !board[crow + 1][ccol].cellWall) { //down
                let temp = crow + 1
                board[crow + 1][ccol].visited = true
                fifo.push({ row: temp, col: ccol })
            }
            if (ccol - 1 >= 0 && !board[crow][ccol - 1].visited && !board[crow][ccol - 1].cellWall) { //left
                let temp = ccol - 1
                board[crow][ccol - 1].visited = true
                fifo.push({ row: crow, col: temp })
            }
            if (crow - 1 >= 0 && !board[crow - 1][ccol].visited && !board[crow - 1][ccol].cellWall) { //up
                let temp = crow - 1
                board[crow - 1][ccol].visited = true
                fifo.push({ row: temp, col: ccol })
            }
        }
    }

    const handleAlgorithm = () => {
        switch (algorithm) {
            case 'dijkstras':
                handleDijkstras()
                //visualizeAlgorithm()
                //showPath()
                break
            case 'depth-first':
                handleDFS(startCoordinates.row, startCoordinates.col)
                visualizeAlgorithm()
                break
            case 'breadth-first':
                handleBFS(startCoordinates.row, startCoordinates.col)
                visualizeAlgorithm()
                break

            default: return
        }
    }

    const showPath = () => {
        console.log('show path here');
    }

    const visualizeAlgorithm = () => {
        interStop = setInterval(() => {
            let element = traversed.shift()
            board[element.row][element.col].finding = true
            setKey(prev => prev + 1)
            if (traversed.length === 0) {
                clearInterval(interStop);
            }
        }, 75)

        finished = false
        //traversed = []
        fifo = []
    }

    const handleMouseOver = (event, ci, ri) => {
        if (clickingCell) { //clicking cell/cell wall
            if (event.target.className === 'start-cell' || event.target.className === 'stop-cell') { }
            else {
                if (!board[ri][ci].cellWall) {
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
                board[startCoordinates.row][startCoordinates.col].start = false
                setStartCoordinates({ row: ri, col: ci })
                board[ri][ci].start = true
                board[ri][ci].cellWall = false
            }
        }
        else if (clickingStop) {
            if (event.target.className === 'start-cell') { }
            else {
                event.target.style.backgroundColor = 'red'
                event.target.className = 'stop-cell'
                board[stopCoordinates.row][stopCoordinates.col].stop = false
                setStopCoordinates({ row: ri, col: ci })
                board[ri][ci].stop = true
                board[ri][ci].cellWall = false
            }
        }
    }

    const handleCellClick = (event, ri, ci) => {
        if (event.target.style.backgroundColor === 'black') {
            event.target.style.backgroundColor = 'white'
            event.target.className = 'cell'
            board[ri][ci].cellWall = false
        }
        else {
            event.target.style.backgroundColor = 'black'
            event.target.className = 'cell-wall'
            board[ri][ci].cellWall = true
        }
        board[ri][ci].start = false
        board[ri][ci].stop = false
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
                                    else if (board[ri][ci].finding) {
                                        return (<td className='finding' key={`${ri}-${ci}`} style={findingStyle}></td>)
                                    }
                                    // else if (board[ri][ci].visited)
                                    //     return (<td className='visited' key={`${ri}-${ci}`} style={visualizeStyle}></td>)
                                    else if (board[ri][ci].cellWall) {
                                        return (<td className='cell-wall' key={`${ri}-${ci}`} style={wallStyle}
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
                                            onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}>
                                        </td>)
                                    }
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
                                                onPointerOver={(event) => { handleMouseOver(event, ci, ri) }}>
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
                                    else if (board[ri][ci].finding) {
                                        return (<td className='finding' key={`${board[ri][ci].something}${ri}-${ci}`} style={findingStyle}></td>)
                                    }
                                    // else if (board[ri][ci].visited)
                                    //     return (<td className='visited' key={`${ri}-${ci}`} style={visualizeStyle}></td>)

                                    else if (board[ri][ci].cellWall)
                                        return (<td className='cell-wall' key={`${ri}-${ci}`} style={wallStyle}></td>)
                                    else
                                        return (<td className='cell' key={`${board[ri][ci].something}${ri}-${ci}`} style={style}>{key}</td>)
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
