import { useState, useEffect } from 'react'
import '../css for components/Board.css'

const createBoard = (rowCount, colCount) => {
    let board = [];
    for (let x = 0; x < rowCount; x++) {
        let col = [];
        for (let y = 0; y < colCount; y++) {
            col.push({
                x: x,
                y: y,
                visited: false,
                isWall: false
            });
        }
        board.push(col);
    }
    return board
}


const handleOnClick = (event, x, y) => {
    event.target.style.backgroundColor === 'white' ?
        event.target.style.backgroundColor = 'black' : event.target.style.backgroundColor = 'white'
}

const Board = () => {
    const [board, setBoard] = useState([]);
    const [clicking, setClicking] = useState(false);

    //creates new board on mount
    useEffect(() => {
        const newBoard = createBoard(28, 75);
        setBoard(newBoard);
    }, []);
    //hello
    //styling for individual cells
    let style = {
        width: 25,
        height: 25,
        border: '0.5px solid black',
        backgroundColor: 'white',
    }

    return (
        <table className='board' >
            <tbody>
                {board.map((row, ri) => {
                    return (
                        <tr className='row' key={ri} >
                            {row.map((col, ci) => {
                                return (
                                    <td className='cell' key={ri + '-' + ci}
                                        style={style}
                                        onClick={(event) => {handleOnClick(event, ci, ri)}}
                                        onDragStart={(event) => {event.preventDefault()
                                        console.log('drag started');}}
                                        onPointerDown={(event) => {
                                            setClicking(true)
                                            handleOnClick(event, ci, ri)
                                        }}
                                        onPointerUp={() => {setClicking(false)}}
                                        onPointerOver={(event) => {clicking && handleOnClick(event, ci, ri)}}
                                    >
                                    </td>)
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )

}

export default Board