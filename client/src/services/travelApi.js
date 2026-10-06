import { http } from './http';

export const visaRequirements = (query) =>
  http.get(`/travel/visa`, query);

export const flightOptions = (query) =>
  http.get(`/travel/flights`, query);
