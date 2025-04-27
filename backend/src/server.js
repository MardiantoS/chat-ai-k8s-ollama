import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Ollama API proxy running on port ${PORT}`);
});