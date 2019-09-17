const fs = require('fs')
const { exec } = require('child_process')
const express = require('express')
const server = express()
server.use(express.json())

const sanitizeArrToString = (str) => JSON.stringify(str).split(/[\[\],]/).join(' ').trim()

server.post('/graph', (req, res) => {
  let { qtdElevator, selectedFloor, elevatorsTimes, elevatorsPaths } = req.body

  elevatorsTimes = sanitizeArrToString(elevatorsTimes)

  strPaths = ''
  elevatorsPaths.map((path, i) => {
    path = sanitizeArrToString(path)
    strPaths += `${path}${i + 1 !== elevatorsPaths.length ? '\n' : ''}`
  })

  const questionInput = `${qtdElevator} ${selectedFloor}\n${elevatorsTimes}\n${strPaths}\n`

  fs.writeFile('./solver/input.txt', questionInput, err => {
    if (err) throw new Error('fuck... there was a problem when saving the file ;-;')
    console.log('saved input file :D')
  })

  exec('./solver/./prog < ./solver/input.txt', (err, stdout, stderr) => {
    if (err) throw new Error('fuck... there was a problem when running the binary ;-;')
    console.log('the binary run with success :D')
    const paths = stdout.split('\n')
    res.send({ shortest_path: [paths[0], paths[1]] })
  })
})

server.listen(3333, () => console.log('server is running at port 3000'))
