import Api from './Api';

export const signup = async (userData) => {
  try {
    const response = await Api.post(`/api/v1/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await Api.post(`/api/v1/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(`/api/v1/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};

export const verifyJWT = async () => {
  try {
    const response = await Api.get(`/api/v1/auth/verifyJWT`);
    return response.data;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    throw error;
  }
};