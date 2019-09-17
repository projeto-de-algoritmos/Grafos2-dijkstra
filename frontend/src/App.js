import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [board, setBoard] = useState([
    [true, true, false, false, false,],
    [false, false, true, false, true,],
    [false, true, true, false, true,],
    [false, false, false, true, true,],
    [true, false, true, false, false,],
    [false, false, false, true, false,],
    [true, true, true, false, true,],
    [true, true, true, true, true,],
    [false, false, true, false, true,],
    [true, true, false, true, true,],
    [true, true, true, false, true,],
    [false, false, false, true, false,],
  ])

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

    let idx = 1
    myLoop(idx)

    function myLoop(idx) {
      setTimeout(() => {

        document.getElementById((shortestPath[idx][1] === '0' ? shortestPath[idx][2] : (shortestPath[idx][1] + shortestPath[idx][2])) + '-' + shortestPath[idx][0]).classList.add('path')
        document.getElementById((shortestPath[idx - 1][1] === '0' ? shortestPath[idx - 1][2] : (shortestPath[idx - 1][1] + shortestPath[idx - 1][2])) + '-' + shortestPath[idx - 1][0]).classList.remove('path')
        idx++

        if (idx < shortestPath.length)
          myLoop(idx);

      }, 1000)
    }

    setBoard(newBoard)
  }

  let e1 = []; let e2 = []; let e3 = []; let e4 = []; let e5 = [];
  for (let i = 0; i < 12; i++) {
    if (board[i][0]) e1.push(11 - i)
    if (board[i][1]) e2.push(11 - i)
    if (board[i][2]) e3.push(11 - i)
    if (board[i][3]) e4.push(11 - i)
    if (board[i][4]) e5.push(11 - i)
  }

  // console.log(e1, e2, e3, e4, e5)

  return (
    <>
      <table>
        <tbody>
          {board.map((arr, x) =>
            <tr key={x} data-in>
              {arr.map((val, y) =>
                <td className={`cell ${board[x][y] ? 'activated' : 'deactivated'}`} key={`${11 - x}-${y + 1}`}
                  id={`${11 - x}-${y + 1}`}
                  onClick={() => findShortest(11 - x)}></td>)}
            </tr>
          )}
        </tbody>
      </table >
    </>
  );
}

export default App;
