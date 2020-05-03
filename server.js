const express = require('express');
const path = require('path');

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


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));