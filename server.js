const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const port = 8000;

const messages = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use(function (req, res, next) {
  res.status(404).send('Not found...');
});


const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });

  console.log('I\'ve added a listener on message event \n');
});