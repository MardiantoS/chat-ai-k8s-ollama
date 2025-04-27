import ollama from 'ollama';

// Configure Ollama host
ollama.host = process.env.OLLAMA_URL || 'http://ollama-service:80';

console.log('Ollama host set to:', ollama.host);

export const generateResponse = async (req, res) => {
    try {
      const { message, system_prompt } = req.body;
      
      console.log('Sending request to Ollama with message:', message.substring(0, 50) + '...');
      
      const response = await ollama.chat({
        model: 'llama3.2',
        messages: [
          { role: 'system', content: system_prompt || '' },
          { role: 'user', content: message }
        ],
        stream: false
      });
      
      console.log('Received response from Ollama');
      res.json({ response: response.message.content });
    } catch (error) {
      console.error('Error generating response:', error);
      console.error('Error details:', error.cause || 'No additional details');
      res.status(500).json({ 
        error: 'Failed to generate response',
        details: error.message 
      });
    }
};

export const getModels = async (req, res) => {
    try {
        console.log('Fetching models from Ollama...');
        const models = await ollama.list();
        console.log('Models retrieved from Ollama:', models);
        res.json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        console.error('Error details:', error.cause || 'No additional details');
        res.status(500).json({ 
        error: 'Failed to fetch models',
        details: error.message 
        });
    }
};