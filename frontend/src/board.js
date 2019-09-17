export const createBoard = (rows, cols, prob) => {

  let board = []
  Array.from({ length: rows }).map(_ => {
    let row = []
    Array.from({ length: cols }).map(_ => row.push(Math.random() < prob))
    board.push(row)
  })
  return board
}

export const createElevatorTimes = (n) => {

  let board = []
  Array.from({ length: n }).map(_ => {
    board.push(Math.floor(Math.random() * 100))
  })
  return board
}
