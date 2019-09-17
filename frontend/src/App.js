import React, { useState } from 'react';
import axios from 'axios'
import './App.css';
import { createBoard, createElevatorTimes } from './board'

function App() {

  const [board, setBoard] = useState(createBoard(12, 5, .4))
  const [eTimes, setETimes] = useState(createElevatorTimes(5))
  const [totalTime, setTotalTime] = useState(0)

  async function findShortest(x) {
    const obj = {
      "qtdElevator": 5,
      "selectedFloor": x,
      "elevatorsTimes": [...eTimes],
      "elevatorsPaths": [e1.sort((a, b) => a - b), e2.sort((a, b) => a - b), e3.sort((a, b) => a - b), e4.sort((a, b) => a - b), e5.sort((a, b) => a - b)]
    }
    const res = await axios.post('http://localhost:3333/graph', obj)
    setTotalTime(res.data.shortest_path[0])
    const shortestPath = res.data.shortest_path[1].split(' ')

    let idx = 0

    myLoop(idx)

    function myLoop(idx) {
      setTimeout(() => {

        let currCellId = (shortestPath[idx][1] === '0' ? shortestPath[idx][2] : (shortestPath[idx][1] + shortestPath[idx][2])) + '-' + shortestPath[idx][0]
        document.getElementById(currCellId).classList.add('path')

        if (idx !== 0) {
          let prevCellId = (shortestPath[idx - 1][1] === '0' ? shortestPath[idx - 1][2] : (shortestPath[idx - 1][1] + shortestPath[idx - 1][2])) + '-' + shortestPath[idx - 1][0]
          document.getElementById(prevCellId).classList.remove('path')
        }
        idx++

        if (idx < shortestPath.length)
          myLoop(idx);

      }, 1000)
    }

  }

  let e1 = []; let e2 = []; let e3 = []; let e4 = []; let e5 = [];
  for (let i = 0; i < 12; i++) {
    if (board[i][0]) e1.push(11 - i)
    if (board[i][1]) e2.push(11 - i)
    if (board[i][2]) e3.push(11 - i)
    if (board[i][3]) e4.push(11 - i)
    if (board[i][4]) e5.push(11 - i)
  }

  return (
    <>
      <div className="times">
        <h1>Tempo Total: {totalTime}</h1>
      </div>

      <table >
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

      <div className="times">
        {eTimes.map((e, i) => (
          <h2>
            <p>Elevador {i + 1}:</p><h1> {e}s</h1>
          </h2>
        ))}
      </div>
    </>
  );
}

export default App;
