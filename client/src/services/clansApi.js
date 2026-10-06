import { http } from './http';

export const findByDestination = (query) =>
  http.get(`/clans`, query);

export const join = (body) =>
  http.post(`/clans/join`, body);

export const leave = (id, body) =>
  http.post(`/clans/${id}/leave`, body);
