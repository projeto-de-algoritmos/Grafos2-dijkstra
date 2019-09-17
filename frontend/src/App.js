import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [board, setBoard] = useState([
    [0, 0, -1, -1, -1,],
    [-1, -1, 0, -1, 0,],
    [-1, 0, 0, -1, 0,],
    [-1, -1, -1, 0, 0,],
    [0, -1, 0, -1, -1,],
    [-1, -1, -1, 0, -1,],
    [0, 0, 0, -1, 0,],
    [0, 0, 0, 0, 0,],
    [-1, -1, 0, -1, 0,],
    [0, 0, -1, 0, 0,],
    [0, 0, 0, -1, 0,],
    [-1, -1, -1, 0, -1,],
  ])

  console.log(board)

  async function findShortest(x) {
    console.log(x)
    const obj = {
      "qtdElevator": 5,
      "selectedFloor": x,
      "elevatorsTimes": [10, 5, 4, 3, 2],
      "elevatorsPaths": [e1.sort((a, b) => a - b), e2.sort((a, b) => a - b), e3.sort((a, b) => a - b), e4.sort((a, b) => a - b), e5.sort((a, b) => a - b)]
    }
    const res = await axios.post('http://localhost:3333/graph', obj)

    const shortestPath = res.data.shortest_path[1].split(' ')
    console.log(shortestPath)

    const newBoard = JSON.parse(JSON.stringify(board))
    shortestPath.map(path => {
      const elevator = path[0]
      const floor = path[1] + path[2]
      console.log(floor, elevator)
      newBoard[11 - floor][elevator - 1] = 1
    })
    setBoard(newBoard)
  }

  let e1 = []; let e2 = []; let e3 = []; let e4 = []; let e5 = [];
  for (let i = 0; i < 12; i++) {
    if (board[i][0] === 0) e1.push(11 - i)
    if (board[i][1] === 0) e2.push(11 - i)
    if (board[i][2] === 0) e3.push(11 - i)
    if (board[i][3] === 0) e4.push(11 - i)
    if (board[i][4] === 0) e5.push(11 - i)
  }

  // console.log(e1, e2, e3, e4, e5)

  return (
    <>
      <table>
        <tbody>
          {board.map((arr, x) =>
            <tr key={x} data-in>
              {arr.map((val, y) =>
                <td className={`cell ${board[x][y] === 0 ? 'activated' : (board[x][y] === -1 ? 'deactivated' : 'path')}`} key={`${11 - x}-${y + 1}`}
                  data-index={`${11 - x}-${y + 1}`}
                  onClick={() => findShortest(11 - x)}></td>)}
            </tr>
          )}
        </tbody>
      </table >
    </>
  );
}

export default App;
