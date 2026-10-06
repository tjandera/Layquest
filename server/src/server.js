import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

try {
  await connectDB();
  console.log('MongoDB connected');
} catch (err) {
  // Keep the API up so /api/health still works while the DB is being set up.
  console.warn(`MongoDB not connected: ${err.message}`);
}

app.listen(env.port, () => {
  console.log(`Layquest API listening on http://localhost:${env.port}`);
});
