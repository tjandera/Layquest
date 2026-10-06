import { http } from './http';

export const register = (body) =>
  http.post(`/auth/register`, body);

export const login = (body) =>
  http.post(`/auth/login`, body);

export const me = (query) =>
  http.get(`/auth/me`, query);
