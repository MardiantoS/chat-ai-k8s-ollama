const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const sendMessage = async (message, systemPrompt = '') => {
    console.log('sendMessage called with:', { message, systemPrompt }); // Log input
    console.log('Using API_URL:', API_URL); // Log API URL
    try {
        const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            system_prompt: systemPrompt
        }),
        });

        console.log('sendMessage response:', response); // Log the raw response

        if (!response.ok) {
            console.error('sendMessage failed with status:', response.status); // Log error status
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getAvailableModels = async () => {
    console.log('getAvailableModels called'); // Log function call
    console.log('Using API_URL:', API_URL); // Log API URL
    try {
        const response = await fetch(`${API_URL}/models`);
        console.log('getAvailableModels response:', response); // Log raw response
        
        if (!response.ok) {
            console.error('getAvailableModels failed with status:', response.status); // Log error status
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};