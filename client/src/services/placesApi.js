import { http } from './http';

export const search = (query) =>
  http.get(`/places`, query);

export const nearby = (query) =>
  http.get(`/places/nearby`, query);

export const getById = (id, query) =>
  http.get(`/places/${id}`, query);
