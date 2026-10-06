import mongoose from 'mongoose';
import { env } from './env.js';

// Cache the connection on globalThis so serverless invocations (Vercel) reuse it.
const cache = (globalThis.__layquestMongo ??= { conn: null, promise: null });

export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!env.mongodbUri) throw new Error('MONGODB_URI is not set');

  cache.promise ??= mongoose.connect(env.mongodbUri);
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
