// src/api/user.js
import Api from './Api';

export const getUsers = async () => {
  try {
    const response = await Api.get('/api/v1/user/getUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching Users:', error);
    throw error;
  }
};