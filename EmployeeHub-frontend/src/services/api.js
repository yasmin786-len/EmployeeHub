import axios from 'axios';

/**
 * Base URL for the Employee Management backend API.
 * Override via VITE_API_BASE_URL in a .env file if needed.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor (hook point for auth tokens, logging, etc.)
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalizes error shape so components can
// rely on `error.message` and `error.fieldErrors` consistently.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const normalized = {
        status: error.response.status,
        message: data?.message || 'Something went wrong. Please try again.',
        fieldErrors: data?.fieldErrors || null,
      };
      return Promise.reject(normalized);
    }
    if (error.request) {
      return Promise.reject({
        status: 0,
        message: 'Unable to reach the server. Please check your connection or try again later.',
        fieldErrors: null,
      });
    }
    return Promise.reject({
      status: -1,
      message: error.message || 'An unexpected error occurred.',
      fieldErrors: null,
    });
  }
);

export default api;
