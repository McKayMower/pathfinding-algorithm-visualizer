import { useState, useEffect } from 'react'
import '../css for components/Board.css'
import PriorityQueue from 'js-priority-queue'
let interStop = 0

const Board = ({ incomingAlgorithm, incomingClearBoard, incomingClearPath, incomingVisualizeCommand, incomingPausePlay }) => {

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

    // let startStyle = {
    //     width: '25px',
    //     height: '25px',
    //     border: '0.5px solid black',
    //     backgroundColor: 'green',
    // }

    // let findingStyle = {
    //     width: '25px',
    //     height: '25px',
    //     border: '0.5px solid black',
    //     backgroundColor: '#2596be',
    //     transition: 'background-color .2s linear'
    // }

    // let showingStyle = {
    //     width: '25px',
    //     height: '25px',
    //     border: '0.5px solid black',
    //     backgroundColor: 'grey',
    //     transition: 'background-color .2s linear'
    // }

    // let stopStyle = {
    //     width: '25px',
    //     height: '25px',
    //     border: '0.5px solid black',
    //     backgroundColor: 'red',
    // }

    //clear board useEffect
    useEffect(() => {
        clearFullBoard()
    }, [incomingClearBoard])

    //clear path useEffect
    useEffect(() => {
        clearPath()
    }, [incomingClearPath])

    //algorithm useEffect
    useEffect(() => {
        setAlgorithm(incomingAlgorithm)
    }, [incomingAlgorithm])

    //visualize useEffect
    useEffect(() => {
        handleAlgorithm()
    }, [incomingVisualizeCommand])
    
    useEffect(() => {
        if(incomingPausePlay) { //if paused
            clearInterval(interStop)
        }
        else { //if play
            clearInterval(interStop)
        }
    }, [incomingPausePlay])
    //sets board on page loadup
    useEffect(() => {
        setBoard(createBoard(boardHeight, boardWidth))
        setStopCoordinates({ row: 15, col: 42 })
        setStartCoordinates({ row: 15, col: 14 })
        setCanDraw(true)
    }, [])

    const clearFullBoard = () => {
        //setKey(key => key + 1)
        clearInterval(interStop)
    }

    const clearPath = () => {
        clearInterval(interStop)
    }

    const createBoard = (rowCount, colCount) => {
        let board = [];
        for (let x = 0; x < rowCount; x++) {
            let col = [];
            for (let y = 0; y < colCount; y++) {
                col.push({
                    row: x,
                    col: y,
                    visited: false,
                    distance: Infinity,
                    prev: null,
                    cellWall: false,
                    visualize: false,
                    start: false,
                    stop: false,
                    finding: false,
                    showing: false,
                })
            }
            board.push(col);
        }
        return board
    }

    const handleDijkstras = () => {

        var queue = new PriorityQueue({
            comparator: function (a, b) {
                return a.distance - b.distance
            }
        });

        queue.queue(board[startCoordinates.row][startCoordinates.col])

        while (queue.length) {
            let curr = queue.dequeue()
            traversed.push({ row: curr.row, col: curr.col })
            if (curr.stop) {
                queue.clear()
                break
            }
            //right
            if (curr.col + 1 < boardWidth && !board[curr.row][curr.col + 1].cellWall && !board[curr.row][curr.col + 1].start && !board[curr.row][curr.col + 1].visited) {
                board[curr.row][curr.col].visited = true
                let tempDistance = curr.distance + 1
                if (tempDistance < board[curr.row][curr.col + 1].distance) {
                    board[curr.row][curr.col + 1].distance = tempDistance
                    board[curr.row][curr.col + 1].prev = { row: curr.row, col: curr.col }
                    queue.queue(board[curr.row][curr.col + 1])
                }
            }
            //down
            if (curr.row + 1 < boardHeight && !board[curr.row + 1][curr.col].cellWall && !board[curr.row + 1][curr.col].start && !board[curr.row + 1][curr.col].visited) {
                board[curr.row][curr.col].visited = true
                let tempDistance = curr.distance + 1
                if (tempDistance < board[curr.row + 1][curr.col].distance) {
                    board[curr.row + 1][curr.col].distance = tempDistance
                    board[curr.row + 1][curr.col].prev = { row: curr.row, col: curr.col }
                    queue.queue(board[curr.row + 1][curr.col])
                }
            }
            //left
            if (curr.col - 1 >= 0 && !board[curr.row][curr.col - 1].cellWall && !board[curr.row][curr.col - 1].start && !board[curr.row][curr.col - 1].visited) {
                board[curr.row][curr.col].visited = true
                let tempDistance = curr.distance + 1
                if (tempDistance < board[curr.row][curr.col - 1].distance) {
                    board[curr.row][curr.col - 1].distance = tempDistance
                    board[curr.row][curr.col - 1].prev = { row: curr.row, col: curr.col }
                    queue.queue(board[curr.row][curr.col - 1])
                }
            }
            //up
            if (curr.row - 1 >= 0 && !board[curr.row - 1][curr.col].cellWall && !board[curr.row - 1][curr.col].start && !board[curr.row - 1][curr.col].visited) {
                board[curr.row][curr.col].visited = true
                let tempDistance = curr.distance + 1
                if (tempDistance < board[curr.row - 1][curr.col].distance) {
                    board[curr.row - 1][curr.col].distance = tempDistance
                    board[curr.row - 1][curr.col].prev = { row: curr.row, col: curr.col }
                    queue.queue(board[curr.row - 1][curr.col])
                }
            }
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
                handleDFS(row, col + 1)
            }
            if (!finished && row + 1 < boardHeight && !board[row + 1][col].cellWall && !board[row + 1][col].start && !board[row + 1][col].visited) { //down
                handleDFS(row + 1, col)
            }
            if (!finished && col - 1 >= 0 && !board[row][col - 1].cellWall && !board[row][col - 1].start && !board[row][col - 1].visited) { //left
                handleDFS(row, col - 1)
            }
            if (!finished && row - 1 >= 0 && !board[row - 1][col].cellWall && !board[row - 1][col].start && !board[row - 1][col].visited) { //up
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
        setCanDraw(false)

        switch (algorithm) {
            case 'dijkstras':
                handleDijkstras()
                visualizeAlgorithm()
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
        let curr = board[stopCoordinates.row][stopCoordinates.col]
        interStop = setInterval(() => {
            if (curr.prev !== null) {
                board[curr.row][curr.col].showing = true
                curr = board[curr.prev.row][curr.prev.col]
                setKey(key => key + 1)
            }
            else {
                setCanDraw(true)
                clearInterval(interStop)
            }
        }, 0)
    }

    const visualizeAlgorithm = () => {
        interStop = setInterval(() => {
            let element = traversed.shift()
            board[element.row][element.col].finding = true
            setKey(key => key + 1)
            if (traversed.length === 0) {
                traversed = []
                setCanDraw(true)
                clearInterval(interStop);
                if (algorithm === 'dijkstras')
                    showPath()
            }
        }, 0)

        finished = false
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
                event.target.className = 'start-cell'
                board[startCoordinates.row][startCoordinates.col].start = false
                board[startCoordinates.row][startCoordinates.col].distance = Infinity
                setStartCoordinates({ row: ri, col: ci })
                board[ri][ci].distance = 0
                board[ri][ci].start = true
                board[ri][ci].cellWall = false
            }
        }
        else if (clickingStop) {
            if (event.target.className === 'start-cell') { }
            else {
                event.target.className = 'stop-cell'
                board[stopCoordinates.row][stopCoordinates.col].stop = false
                setStopCoordinates({ row: ri, col: ci })
                board[ri][ci].stop = true
                board[ri][ci].cellWall = false
            }
        }
    }

    const handleCellClick = (event, ri, ci) => {
        if (event.target.className === 'cell') {
            event.target.className = 'cell-wall'
            board[ri][ci].cellWall = true
        }
        else {
            event.target.className = 'cell'
            board[ri][ci].cellWall = false
        }
    }

    if (canDraw) {
        return (
            <table className='board' key={'board'}
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
                                        board[ri][ci].start = true
                                        board[ri][ci].distance = 0
                                        return (
                                            <td className='start-cell' key={`${ri},${ci}`}
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
                                        board[ri][ci].stop = true
                                        return (
                                            <td className='stop-cell' key={`${ri},${ci}`}
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
                                    else if (board[ri][ci].showing) {
                                        return (<td className='showing' key={`${ri},${ci}`}></td>)
                                    }
                                    else if (board[ri][ci].finding) {
                                        return (<td className='finding' key={`${ri},${ci}`}></td>)
                                    }
                                    else if (board[ri][ci].cellWall) {
                                        return (<td className='cell-wall' key={`${ri},${ci}`} style={wallStyle}
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
                                            <td className='cell' key={`${ri},${ci}`} style={style}
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
            <table className='board' key={'board'} onDragStart={(event) => event.preventDefault()}>
                <tbody>
                    {board.map((row, ri) => {
                        return (
                            <tr className='row' key={ri} >
                                {row.map((col, ci) => {
                                    if (ri === startCoordinates.row && ci === startCoordinates.col)
                                        return (<td className='start-cell' key={`${ri},${ci}`}></td>)
                                    else if (ri === stopCoordinates.row && ci === stopCoordinates.col)
                                        return (<td className='stop-cell' key={`${ri},${ci}`}></td>)
                                    else if (board[ri][ci].showing) {
                                        return (<td className='showing' key={`${ri},${ci}`}></td>)
                                    }
                                    else if (board[ri][ci].finding) {
                                        return (<td className='finding' key={`${ri},${ci}`}></td>)
                                    }
                                    else if (board[ri][ci].cellWall)
                                        return (<td className='cell-wall' key={`${ri},${ci}`}></td>)
                                    else
                                        return (<td className='cell' key={`${ri},${ci}`}></td>)
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
