import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../utils/httpError.js';

/** Requires `Authorization: Bearer <jwt>`. Sets req.user = { id }. */
export function requireAuth(req, _res, next) {
  const [scheme, token] = (req.get('authorization') ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Missing bearer token'));
  }
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub };
    return next();
  } catch {
    return next(new HttpError(401, 'Invalid or expired token'));
  }
}
