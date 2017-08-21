const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//chat

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: '+ msg)
    io.emit('chat message', msg)
  })
})

http.listen(port, () => {
  console.log('Listening on port 3000')
})
