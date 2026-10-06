import { http } from './http';

export const generate = (body) =>
  http.post(`/itineraries/generate`, body);

export const getById = (id, query) =>
  http.get(`/itineraries/${id}`, query);

export const revise = (id, body) =>
  http.post(`/itineraries/${id}/revise`, body);

export const gamify = (id, body) =>
  http.post(`/itineraries/${id}/gamify`, body);
