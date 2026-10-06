import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 && env.isProd ? 'Internal server error' : err.message,
    details: err.details,
  });
}
