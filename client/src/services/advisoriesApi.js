import { http } from './http';

export const getForLocation = (query) =>
  http.get(`/advisories`, query);

export const getSeverityMap = (query) =>
  http.get(`/advisories/map`, query);
