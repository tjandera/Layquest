import { http } from './http';

export const updateMe = (body) =>
  http.patch(`/users/me`, body);

export const requestVerification = (body) =>
  http.post(`/users/me/verify`, body);

export const getPublicProfile = (id, query) =>
  http.get(`/users/${id}`, query);
