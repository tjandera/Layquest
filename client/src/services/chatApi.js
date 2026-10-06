import { http } from './http';

export const listConversations = (query) =>
  http.get(`/chat/conversations`, query);

export const listMessages = (id, query) =>
  http.get(`/chat/conversations/${id}/messages`, query);

export const sendMessage = (id, body) =>
  http.post(`/chat/conversations/${id}/messages`, body);
