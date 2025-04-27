import React, { useState } from 'react';
import { sendMessage } from '../services/chatService';
import './ChatInput.css';

function ChatInput({ onSendMessage, isLoading, setIsLoading }) {
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    console.log('handleSend called with:', inputText); // Log input text

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    };
    onSendMessage(userMessage);
    
    // Clear input
    const userInput = inputText;
    setInputText('');
    
    // Get AI response
    try {
      setIsLoading(true);
      console.log('Calling sendMessage...'); // Log before API call
      const response = await sendMessage(userInput);
      console.log('sendMessage returned:', response); // Log API response
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'ai'
      };
      onSendMessage(aiMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process your message. Please try again.",
        sender: 'ai',
        isError: true
      };
      onSendMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isLoading ? "AI is thinking..." : "Type a message..."}
        disabled={isLoading}
      />
      <button 
        onClick={handleSend} 
        disabled={isLoading || inputText.trim() === ''}
      >
        {isLoading ? 'Processing...' : 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;