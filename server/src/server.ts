import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import allRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT ?? 4000;

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet.hidePoweredBy());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', allRoutes);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
