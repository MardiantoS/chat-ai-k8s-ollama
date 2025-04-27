import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://ollama-service:80';

// Middleware
// Configure CORS with specific origin
app.use(cors());
app.use(express.json());

// Add custom CORS middleware here - between existing middleware and routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:777');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

// Routes
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Function to check Ollama connection and list models
const checkOllamaConnection = async () => {
  try {
    console.log(`Checking connection to Ollama service at ${OLLAMA_URL}...`);
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    console.log('Connection to Ollama service successful!');
    console.log('Available models:');
    console.log(JSON.stringify(response.data.models || response.data, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to connect to Ollama service:', error.message);
    if (error.response) {
      console.error('Error response from Ollama:', error.response.data);
    }
    if (error.request) {
      console.error('Error details:', error.code, error.address, error.port);
    }
    return false;
  }
};

// Start the server only after checking Ollama connection
const startServer = async () => {
  await checkOllamaConnection();
  
  app.listen(PORT, () => {
    console.log(`Ollama API proxy running on port ${PORT}`);
  });
};

startServer();