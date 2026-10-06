import { http } from './http';

export const listPosts = (placeId, query) =>
  http.get(`/content/places/${placeId}/posts`, query);

export const summary = (placeId, query) =>
  http.get(`/content/places/${placeId}/summary`, query);
