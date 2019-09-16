const express = require('express')
const app = express()

app.get('/oi', (req, res) => {
  res.send('oioi')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
})
