// src/api/messages.js
import Api from './Api';

export const getMessages = async (secUserID) => {
  try {
    const response = await Api.get(`/api/v1/message/getMessages/${secUserID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await Api.post('/api/v1/message/postMessage', message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
