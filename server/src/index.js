const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDb = require('./config/db');
const env = require('./config/env');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const locationRoutes = require('./routes/locations');
const historyRoutes = require('./routes/history');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
  }),
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'SafePing API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/history', historyRoutes);

app.use(notFound);
app.use(errorHandler);

process.env.NODE_ENV = env.nodeEnv;

connectDb()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });
