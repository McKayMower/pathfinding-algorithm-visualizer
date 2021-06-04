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

let walls = []

const handleOnClick = (event, x, y) => {
    if(event.target.style.backgroundColor === 'white'){
        event.target.style.backgroundColor = 'black'
        walls.push({x,y})
        console.log(walls)
    }
    else {
        event.target.style.backgroundColor = 'white'
        walls = walls.filter(wall => wall !== {x,y})
        console.log(walls)
    }
}
const Board = ({clearValue}) => {
    const [board, setBoard] = useState([])
    const [clicking, setClicking] = useState(false)
    //const [clearValue, setClearValue] = useState(false)

    //creates new board
    useEffect(() =>{
        console.log('CLEARED BOARD');
        setBoard(createBoard(29,56))
    }, [clearValue])

    let style = {
        width: '25px',
        height: '25px',
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
                                    <td className='cell'
                                        style={style}
                                        key={ri + '-' + ci}
                                        onDragStart={(event) => { event.preventDefault() }}
                                        onPointerDown={(event) => {
                                            setClicking(true)
                                            handleOnClick(event, ci, ri)
                                        }}
                                        onPointerUp={() => setClicking(false)}
                                        onMouseOver={(event) => {
                                            clicking && handleOnClick(event, ci, ri)
                                        }}
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
