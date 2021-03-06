const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

function login(e) {
  e.preventDefault();
  if (userNameInput.value !== '') {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('login', userName);
  } else {
    alert('You have to write your name');
  }
}

loginForm.addEventListener('submit', login);

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  author === userName ? message.classList.add('message--self') : null;
  author === 'Chat Bot' ? message.classList.add('message--bot') : null;

  const authorNode = document.createElement('h3');
  authorNode.classList.add('message__author');
  authorNode.innerHTML = author === userName ? 'You' : author;
  message.appendChild(authorNode);

  const contentNode = document.createElement('div');
  contentNode.classList.add('message__content');
  contentNode.innerHTML = content;
  message.appendChild(contentNode);

  messagesList.appendChild(message);
}

function sendMessage(e) {
  e.preventDefault();
  if (messageContentInput.value !== '') {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value })
    messageContentInput.value = '';
  } else {
    alert('You should write your message');
  }
}

addMessageForm.addEventListener('submit', sendMessage);
