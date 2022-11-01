import express from 'express';
import { PORT } from './config.js';
import tokens from './routes/tokens/tokens.controller.js';

const app = express();

app.use(express.json({ limit: '1MB' }));

app.use('/tokens', tokens);

app.listen(PORT, () => {
  console.log(`Token app started on port ${PORT}`);
});
