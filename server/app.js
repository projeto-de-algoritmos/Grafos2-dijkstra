const fs = require('fs')
const express = require('express')
const server = express()

server.use(express.json())

const sanitizeArrToString = (str) => JSON.stringify(str).split(/[\[\],]/).join(' ').trim()

server.post('/graph', (req, res) => {
  let { qtdElevator, selectedFloor, elevatorsTimes, elevatorsPaths } = req.body
  // console.log(qtdElevator, selectedFloor, elevatorsTimes, elevatorsPaths)

  elevatorsTimes = sanitizeArrToString(elevatorsTimes)

  strPaths = ''
  elevatorsPaths.map((path, i) => {
    path = sanitizeArrToString(path)
    strPaths += `${path}${i + 1 !== elevatorsPaths.length ? '\n' : ''}`
  })

  const questionInput = `${qtdElevator} ${selectedFloor}\n${elevatorsTimes}\n${strPaths}\n`

  fs.writeFile('./solver/input.txt', questionInput, err => {
    if (err) throw new Error('Lascou!')

    console.log('saved')
  })

  res.send({ ok: true })
})

server.listen(3000, () => console.log('server running at port 3000'))
