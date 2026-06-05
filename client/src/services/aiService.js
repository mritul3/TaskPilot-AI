import api from './api';

export const breakdown = (input) => api.post('/ai/breakdown', { input });
export const suggestPriority = (title, description) =>
  api.post('/ai/priority', { title, description });
export const suggestEstimate = (title, description, category) =>
  api.post('/ai/estimate', { title, description, category });
export const generateTasks = (input) => api.post('/ai/generate', { input });
