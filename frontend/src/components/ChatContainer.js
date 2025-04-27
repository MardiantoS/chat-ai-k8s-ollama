import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { getAvailableModels } from '../services/chatService';
import './ChatContainer.css';

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch available models when component mounts
    const fetchModels = async () => {
      try {
        const modelsData = await getAvailableModels();
        setModels(modelsData.models || []);
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };
    
    fetchModels();
  }, []);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <div className="chat-container">
      <div className="model-info">
        {models.length > 0 ? (
          <span>Using model: {models.find(m => m.name === 'llama3.2')?.name || 'llama3.2'}</span>
        ) : (
          <span>Connecting to AI service...</span>
        )}
      </div>
      <MessageList messages={messages} />
      <ChatInput 
        onSendMessage={addMessage} 
        setIsLoading={setIsLoading} 
        isLoading={isLoading} 
      />
    </div>
  );
}

export default ChatContainer;