import React from 'react';
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <div className="empty-message">No messages yet. Start the conversation!</div>
      ) : (
        messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;