import express from 'express';
import { exec } from 'child_process';
const app = express();
const PORT = 3020;

console.log('Starting server initialization...');

app.use(express.json());

const API_KEY = 'your_secret_key'; 


const checkApiKey = (req, res, next) => {
  console.log('Received request with API key:', req.headers['x-api-key']);
  const providedKey = req.headers['x-api-key'];
  if (providedKey !== API_KEY) {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('API key validated successfully');
  next();
};

app.post('/execute', checkApiKey, (req, res) => {
  console.log('Received execute request:', req.body);
  const { command } = req.body;
    
  if (!command) {
    console.log('No command provided');
    return res.status(400).json({ error: 'No command provided' });
  }
  
  console.log('Executing command:', command);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('Command execution error:', error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log('Command executed successfully');
    res.json({ 
      output: stdout || stderr 
    });
  });
});


app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Use Ctrl+C to stop the server');
  console.log('Server is now ready to accept requests');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
  
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
  

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});