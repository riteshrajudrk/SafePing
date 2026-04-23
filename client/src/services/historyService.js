import api from './api';

export const historyService = {
  list: async () => (await api.get('/history')).data,
};
