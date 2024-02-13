// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());

// Socket.io event handlers
io.on('connection', handleConnection);

function handleConnection(socket) {
  console.log('New user connected');

  // Listen for incoming messages
  socket.on('message', handleMessage);

  // Listen for disconnection
  socket.on('disconnect', handleDisconnect);
}

function handleMessage(message) {
  console.log('Message received:', message);
  io.emit('message', message); // Broadcast message to all connected clients
}

function handleDisconnect() {
  console.log('User disconnected');
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
