import axios from 'axios';

// Set Ollama API endpoint
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://ollama-service:80';

console.log('Ollama URL configured as:', OLLAMA_URL);

export const generateResponse = async (req, res) => {
  try {
    const { message, system_prompt } = req.body;
    
    console.log('Sending request to Ollama with message:', message.substring(0, 50) + '...');
    
    const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
      model: 'llama3.2',
      messages: [
        { role: 'system', content: system_prompt || '' },
        { role: 'user', content: message }
      ],
      stream: false
    });
    
    console.log('Received response from Ollama');
    res.json({ response: response.data.message.content });
  } catch (error) {
    console.error('Error generating response:', error.message);
    if (error.response) {
      console.error('Error response from Ollama:', error.response.data);
    }
    if (error.request) {
      console.error('Error details:', error.code, error.address, error.port);
    }
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
};

export const getModels = async (req, res) => {
  try {
    console.log('Fetching models from Ollama at', OLLAMA_URL);
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    console.log('Models retrieved from Ollama:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching models:', error.message);
    if (error.response) {
      console.error('Error response from Ollama:', error.response.data);
    }
    if (error.request) {
      console.error('Error details:', error.code, error.address, error.port);
    }
    res.status(500).json({ 
      error: 'Failed to fetch models',
      details: error.message 
    });
  }
};