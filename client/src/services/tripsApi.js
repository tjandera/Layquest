import { http } from './http';

export const listMine = (query) =>
  http.get(`/trips`, query);

export const create = (body) =>
  http.post(`/trips`, body);

export const getById = (id, query) =>
  http.get(`/trips/${id}`, query);

export const update = (id, body) =>
  http.patch(`/trips/${id}`, body);

export const remove = (id) =>
  http.delete(`/trips/${id}`);
