import express from 'express';
import { PORT } from './config.js';
import tokens from './routes/tokens/tokens.controller.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(limiter);
app.use(express.json({ limit: '1MB' }));

app.use('/tokens', tokens);

app.listen(PORT, () => {
  console.log(`Token app started on port ${PORT}`);
});
