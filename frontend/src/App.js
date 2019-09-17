import React, { useState } from 'react';
import './App.css';

function App() {

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

  let e1 = []
  let e2 = []
  let e3 = []
  let e4 = []
  let e5 = []

  for (let i = 0; i < 12; i++) {
    console.log(i)
    if (board[i][0]) e1.push(i)
    if (board[i][1]) e2.push(i)
    if (board[i][2]) e3.push(i)
    if (board[i][3]) e4.push(i)
    if (board[i][4]) e5.push(i)
  }

  console.log(e1, e2, e3, e4, e5)

  return (
    <table>
      <tbody>
        {board.map((arr, x) =>
          <tr key={x}>
            {arr.map((val, y) =>
              <td className="cell" key={`${x}-${y}`} onClick={() => console.log(x)}>oi</td>)}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;