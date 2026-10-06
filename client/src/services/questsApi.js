import { http } from './http';

export const listMine = (query) =>
  http.get(`/quests`, query);

export const getById = (id, query) =>
  http.get(`/quests/${id}`, query);

export const arriveAtCheckpoint = (id, checkpointId, body) =>
  http.post(`/quests/${id}/checkpoints/${checkpointId}/arrive`, body);

export const nearbyEncounters = (id, query) =>
  http.get(`/quests/${id}/encounters`, query);

export const catchEncounter = (id, encounterId, body) =>
  http.post(`/quests/${id}/encounters/${encounterId}/catch`, body);
