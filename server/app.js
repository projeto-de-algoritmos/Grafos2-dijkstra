const express = require('express')
const server = express()

server.use(express.json())

server.post('/graph', (req, res) => {
  const { qtdElevator, selectedFloor, elevatorsTimes, elevatorsPaths } = req.body
  console.log(qtdElevator, selectedFloor, elevatorsTimes, elevatorsPaths)



  res.send({ ok: true })
})

server.listen(3000, () => console.log('server running at port 3000'))
