import { http } from './http';

export const getMine = (query) =>
  http.get(`/passports/me`, query);

export const updateCover = (body) =>
  http.patch(`/passports/me/cover`, body);

export const getPublic = (userId, query) =>
  http.get(`/passports/${userId}`, query);
