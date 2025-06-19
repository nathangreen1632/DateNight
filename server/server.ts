import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT ?? 4000;

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the compiled Vite React app
app.use(express.static(path.join(__dirname, 'public')));

// Optional: example API route
app.get('/api/ping', (_, res) => {
  res.json({ message: 'pong' });
});

// Serve React app for any route not handled by API
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
