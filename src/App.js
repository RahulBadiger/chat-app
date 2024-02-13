// client/src/App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import CSS file

const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Define message handler function
    const handleMessage = (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    // Listen for 'message' event
    socket.on('message', handleMessage);

    // Clean up event listener
    return () => {
      socket.off('message', handleMessage);
    };
  }, []); // Run effect only once on component mount

  const sendMessage = () => {
    // Check if input is not empty
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat App</h1>
      <div className="message-container">
        {/* Render messages */}
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container">
        {/* Input field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
          placeholder="Type your message here..."
        />
        {/* Send button */}
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default App;
