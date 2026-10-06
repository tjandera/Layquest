import { http } from './http';

export const deck = (query) =>
  http.get(`/sidequests/deck`, query);

export const respondToRequest = (requestId, body) =>
  http.patch(`/sidequests/requests/${requestId}`, body);

export const swipe = (id, body) =>
  http.post(`/sidequests/${id}/swipe`, body);

export const requestToJoin = (id, body) =>
  http.post(`/sidequests/${id}/requests`, body);
