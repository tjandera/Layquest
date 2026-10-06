import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app.js';
import { env } from '../src/config/env.js';

const token = jwt.sign({ sub: 'user-1' }, env.jwtSecret);

describe('API skeleton', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('protected routes reject requests without a token', async () => {
    const res = await request(app).get('/api/trips');
    expect(res.status).toBe(401);
  });

  it('stub controllers answer 501 for authenticated requests', async () => {
    const res = await request(app).get('/api/trips').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(501);
  });

  it('validates itinerary generate payloads', async () => {
    const res = await request(app)
      .post('/api/itineraries/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({ style: 'party' });
    expect(res.status).toBe(400);
  });

  it('unknown routes return 404 JSON', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
  });
});
