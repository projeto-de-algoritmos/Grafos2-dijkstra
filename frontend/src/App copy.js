import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [shortestPath, setShortestPath] = useState([])
  const [board, setBoard] = useState([
    [false, true, true, true, true,],
    [false, true, true, true, true,],
    [true, true, true, true, true,],
    [true, false, false, true, true,],
    [true, true, true, true, true,],
    [false, false, false, true, true,],
    [true, true, true, false, true,],
    [true, true, true, true, true,],
    [false, false, true, false, true,],
    [true, true, false, true, true,],
    [true, true, true, false, true,],
    [true, false, false, true, true,],
  ])

  async function findShortest(x) {
    console.log(x)
    const obj = {
      "qtdElevator": 5,
      "selectedFloor": x,
      "elevatorsTimes": [10, 5, 4, 3, 2],
      "elevatorsPaths": [e1.sort((a, b) => a - b), e2.sort((a, b) => a - b), e3.sort((a, b) => a - b), e4.sort((a, b) => a - b), e5.sort((a, b) => a - b)]
    }
    console.log(obj)
    const res = await axios.post('http://localhost:3333/graph', obj)

    setShortestPath(res.data.shortest_path[1].split(' '))
  }

  let e1 = []; let e2 = []; let e3 = []; let e4 = []; let e5 = [];
  for (let i = 0; i < 12; i++) {
    if (board[i][0]) e1.push(11 - i)
    if (board[i][1]) e2.push(11 - i)
    if (board[i][2]) e3.push(11 - i)
    if (board[i][3]) e4.push(11 - i)
    if (board[i][4]) e5.push(11 - i)
  }

  console.log(e1, e2, e3, e4, e5)

  return (
    <>
      <table>
        <tbody>
          {board.map((arr, x) =>
            <tr key={x} data-in>
              {arr.map((val, y) =>
                <td className={`cell ${board[x][y] ? 'activated' : 'deactivated'}`} key={`${11 - x}-${y + 1}`}
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
