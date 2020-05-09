const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const port = 8000;

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use(function (req, res, next) {
  res.status(404).send('Not found...');
});


const server = app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('login', (user) => {
    users.push({ name: user, id: socket.id });
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${user} has joined the conversation!` });
  });

  socket.on('disconnect', () => {
    const user = users.find(user => user.id === socket.id);
    socket.broadcast.emit('message', { author: 'Chat Bot', content: `${user.name} has left the conversation... :(` });
    users.splice(users.indexOf(user), 1);
  });
});